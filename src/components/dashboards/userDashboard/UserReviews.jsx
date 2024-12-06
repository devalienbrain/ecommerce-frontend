import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../../provider/UserContext";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { user } = useUser();
  const userId = user?.id;
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reviews?userId=${userId}`)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [userId]);

  return (
    <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-black text-center mb-5">
        My Reviews
      </h1>
      <hr className="mb-7" />
      <div className="grid grid-cols-1 gap-4">
        {reviews?.map((review) => (
          <div key={review?.id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{review?.product?.name}</h3>
            <p>Rating: {review?.rating}/5</p>
            <p>{review?.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
