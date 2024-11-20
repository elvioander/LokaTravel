import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaStar } from "react-icons/fa"; // Import star icon from react-icons

const RatingComponent = ({ placeId }) => {
  const { data: session, status } = useSession();
  const userId = session?.user.id;

  const [score, setScore] = useState(1); // Default rating score
  const [message, setMessage] = useState("");

  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/places/rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        placeId,
        userId,
        score,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Rating submitted successfully!");
    } else {
      setMessage(data.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Rate this Place</h3>
      <div className="flex items-center gap-x-4">
        <div style={{ display: "flex", cursor: "pointer" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => setScore(star)}
              style={{
                color: star <= score ? "#FFD700" : "#e4e5e9", // Gold for selected stars, light gray for unselected
                fontSize: "30px",
                marginRight: "5px",
                transition: "color 0.2s",
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleRatingSubmit}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Submit Rating
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RatingComponent;
