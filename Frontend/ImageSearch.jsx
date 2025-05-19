import { useState } from "react";

function ImageSearch() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    const response = await fetch("http://localhost:5000/get-images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log("Response from Flask:", data);

    if (data.results) {
      setImages(data.results);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Interior Design Inspiration
        </h1>
        <p className="text-gray-500 mb-8">
          Search for beautiful interior ideas powered by AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try 'modern kitchen', 'cozy bedroom'..."
            className="w-full sm:w-2/3 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Search
          </button>
        </div>

        {/* Images Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.length > 0 ? (
            images.map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl shadow-lg transform transition hover:scale-105"
              >
                <img
                  src={img.url}
                  alt={`Interior Design ${index}`}
                  className="w-full h-60 object-cover"
                />
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-400 text-lg">
              No images found. Try searching for something else.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageSearch;
