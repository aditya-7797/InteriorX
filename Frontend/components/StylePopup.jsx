import React, { useState } from "react";

const styles = [
  { name: "Modern", src: "/style_images/Modern.jpg" },
  { name: "Transitional", src: "/style_images/Transitional.jpg" },
  { name: "Bohemian", src: "/style_images/bohemian.jpg" },
  { name: "Minimalism", src: "/style_images/Minimalism.jpg" },
  { name: "Industrial", src: "/style_images/Industrial.jpg" },
  { name: "Traditional", src: "/style_images/Traditional.jpg" },
  { name: "Rustic", src: "/style_images/Rustic.jpg" },
  { name: "Scandinavian", src: "/style_images/Scandinavian.jpg" },
  { name: "Farmhouse", src: "/style_images/Farmhouse.jpg" },
  { name: "Mid_Century", src: "/style_images/Mid_Century.jpg" },
  { name: "Coastal", src: "/style_images/Coastal.jpg" },
  { name: "mid-century_modern", src: "/style_images/mid-century_modern.jpg" },
  { name: "Hollywood glam", src: "/style_images/Hollywood glam.jpg" },
];

const StylePopup = ({ onClose }) => {
  const [selected, setSelected] = useState([]);
  const [index, setIndex] = useState(0);

  const handleToggle = (style) => {
    setSelected((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };

  const handleSubmit = async () => {
    const email = localStorage.getItem("user_email");
    console.log("📦 Retrieved email:", email);  // Check if it's null or string

    if (!email) return alert("User not identified");

    try {
      const res = await fetch("http://localhost:5001/sub/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, preferences: selected }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Preferences saved!");
        localStorage.setItem("preferencesSubmitted", "true");
        onClose();
      } else {
        alert("Failed to save preferences");
      }
    } catch (err) {
      console.error("Error saving preferences", err);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-xl w-2/3 h-2/3 relative flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">Choose Your Style</h2>

        <img
          src={styles[index].src}
          alt={styles[index].name}
          className="w-1/2 h-1/2 object-cover rounded-lg mb-4"
        />

        <p className="mb-2">{styles[index].name}</p>

        <div className="flex gap-4">
          <button
            onClick={() => handleToggle(styles[index].name)}
            className={`px-4 py-2 rounded-md ${
              selected.includes(styles[index].name)
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {selected.includes(styles[index].name) ? "Checked" : "Check"}
          </button>

          {index < styles.length - 1 ? (
            <button
              onClick={() => setIndex((prev) => prev + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-500 text-white rounded-md"
            >
              Submit
            </button>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default StylePopup;
