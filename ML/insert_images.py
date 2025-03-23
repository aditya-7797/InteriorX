import os
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["image_database"]
collection = db["image_metadata"]

# Folder where images are stored
image_folder = "/INTERIORX/dataset/images/images"

# List to store image metadata
image_data = []

# Iterate over image files
for filename in os.listdir(image_folder):
    if filename.endswith((".jpg", ".png", ".jpeg")):
        image_data.append({
            "filename": filename,
            "url": f"http://localhost:5000/dataset/images/images/{filename}"
        })

# Ensure list is not empty before inserting
if image_data:
    collection.insert_many(image_data)
    print(f"Inserted {len(image_data)} images into MongoDB.")
else:
    print("❌ No images found in dataset/images/ folder!")
