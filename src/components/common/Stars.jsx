import React from "react";
import { Star } from "lucide-react";

const Stars = ({ rating = 5, size = 22, color = "#ffb800" }) => {
  return (
    <div className="starsWrap">
      {[1, 2, 3, 4, 5].map((item) => {
        const active = item <= Math.round(rating);

        return (
          <Star
            key={item}
            size={size}
            fill={active ? color : "#c8ced7"}
            color={active ? color : "#c8ced7"}
            strokeWidth={1.8}
          />
        );
      })}
    </div>
  );
};

export default Stars;