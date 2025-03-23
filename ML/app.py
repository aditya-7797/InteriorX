import os
import joblib
import torch
import numpy as np
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from transformers import CLIPProcessor, CLIPModel
from pymongo import MongoClient

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Allow CORS for frontend

# ✅ Set Correct Image Folder Path
app.config["UPLOAD_FOLDER"] = os.path.abspath(os.path.join(os.getcwd(), "..", "dataset/images/images"))

# 🔍 Debugging: Ensure the image folder exists
if not os.path.exists(app.config["UPLOAD_FOLDER"]):
    print(f"❌ Error: Image folder not found at {app.config['UPLOAD_FOLDER']}")

# ✅ Load Trained CLIP Model
print("🔄 Loading CLIP model...")
vision_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
print("✅ CLIP Model Loaded Successfully")

# ✅ Load Trained KNN Model & Image Data
try:
    knn = joblib.load("image_retrieval_model.pkl")
    image_filenames = joblib.load("image_filenames.pkl")
    print(f"✅ Loaded KNN Model with {len(image_filenames)} images")
except FileNotFoundError:
    print("❌ Error: Model or image filenames not found. Ensure `image_retrieval_model.pkl` and `image_filenames.pkl` exist.")
    knn = None
    image_filenames = []

# ✅ Connect to MongoDB
try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client["image_database"]
    collection = db["image_metadata"]
    print("✅ MongoDB Connection Established")
except Exception as e:
    print(f"❌ MongoDB Connection Error: {e}")
    collection = None

# ✅ Welcome Route
@app.route("/", methods=["GET"])
def welcome():
    return jsonify({"message": "Welcome to the Image Retrieval API!"})

# ✅ Function to Encode Text Query Using CLIP
def encode_text_clip(text):
    inputs = processor(text=[text], return_tensors="pt", padding=True)
    with torch.no_grad():
        text_features = vision_model.get_text_features(**inputs)
    return text_features.cpu().numpy().flatten()

# ✅ Function to Find Similar Images
def find_similar_images(query_text, top_k=5):
    if knn is None or not image_filenames:
        print("❌ Error: KNN Model or Image Filenames Missing")
        return {"error": "Model or image filenames are missing."}

    try:
        query_embedding = encode_text_clip(query_text)
        distances, indices = knn.kneighbors([query_embedding], n_neighbors=top_k)

        # Retrieve image details from MongoDB
        results = []
        if collection is not None:  # ✅ Corrected Condition
            for i in indices[0]:
                image_filename = image_filenames[i]
                image_data = collection.find_one({"filename": image_filename}, {"_id": 0, "filename": 1, "caption": 1})

                if image_data is not None:
                    results.append({
                        "filename": image_filename,
                        "url": f"http://localhost:5000/dataset/images/images/{image_filename}",  # ✅ Updated URL
                        "caption": image_data.get("caption", "No caption available")
                    })
                else:
                    print(f"⚠ Warning: No metadata found for {image_filename}")

        return results
    except Exception as e:
        print(f"🔥 Error in `find_similar_images`: {str(e)}")
        return {"error": str(e)}

# ✅ API Endpoint to Get Related Images
@app.route('/get-images', methods=['POST'])
def get_images():
    try:
        data = request.json
        if not data or "query" not in data:
            print("❌ Error: Query text is missing in request")
            return jsonify({"error": "Query text is required"}), 400

        query_text = data["query"].strip()
        print(f"🔍 Searching for: {query_text}")

        if not query_text:
            return jsonify({"error": "Query text cannot be empty"}), 400

        matching_images = find_similar_images(query_text)

        if "error" in matching_images:
            return jsonify({"error": matching_images["error"]}), 500  # Return error response

        print(f"✅ Found {len(matching_images)} images for query: {query_text}")
        return jsonify({"results": matching_images})

    except Exception as e:
        print(f"🔥 Unexpected Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# ✅ Serve Static Images Correctly
@app.route('/dataset/images/images/<path:filename>')
def serve_image(filename):
    image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    if os.path.exists(image_path):
        return send_from_directory(app.config["UPLOAD_FOLDER"], filename)
    else:
        print(f"❌ Error: Image {filename} not found at {image_path}")
        return jsonify({"error": "Image not found"}), 404

# ✅ Run Flask App
if __name__ == "__main__":
    app.run(debug=True, port=5000)
