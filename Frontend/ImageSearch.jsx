import { useState } from "react";

function ImageSearch() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    const response = await fetch("http://localhost:5000/get-images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log("Response from Flask:", data); // Debugging

    if (data.results) {
      setImages(data.results);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter design idea..."
      />
      <button onClick={handleSearch}>Search</button>

      {/* Display Images */}
      <div>
        {images.length > 0 ? (
          images.map((img, index) => (
            <img key={index} src={img.url} alt="Design" width="200" />

          ))
        ) : (
          <p>No images found</p>
        )}
      </div>
    </div>
  );
}

export default ImageSearch;
