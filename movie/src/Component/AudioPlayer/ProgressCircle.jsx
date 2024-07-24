import React from "react";
import "./ProgressCricle.css";

const Circle = ({ color, percentage, size, strokeWidth }) => {
  const radius = size / 2 - 10;
  const circ = 2 * Math.PI * radius - 20;
  const strokePct = ((100 - Math.round(percentage)) * circ) / 100;
  return (
    <circle
      r={radius}
      cx="50%"
      cy="50%"
      fill="transparent"
      stroke={strokePct !== circ ? color : ""}
      strokeWidth={strokeWidth}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

export const ProgressCircle = ({
  percentage,
  isPlaying,
  image,
  size,
  color,
}) => {
  return (
    <div className="progress-circle flex">
      <svg width={size} height={size}>
        <g>
          <Circle strokeWidth="0.6rem" color="#384F73" size={size} />
          <Circle
            strokeWidth="0.8rem"
            color={color}
            size={size}
            percentage={percentage}
          />
        </g>
        <defs>
          <clipPath id="myCircle">
            <circle cx="50%" cy="50%" r={size / 2 - 30} fill="#ffffff" />
          </clipPath>
          <clipPath id="myInnerCircle">
            <circle cx="50%" cy="50%" r={size / 2 - 100} fill="#ffffff" />
          </clipPath>
        </defs>
        <image
          className={isPlaying ? "active" : ""}
          x={15}
          y={33}
          width={2 * (size / 2 - 14)}
          height={2 * (size / 2 - 30)}
          href="https://cdn.pixabay.com/photo/2012/04/13/13/23/disc-32390_640.png"
          clipPath="url(#myCircle)"
        />

        <image
          className={isPlaying ? "active" : ""}
          x={15}
          y={100}
          width={2 * (size / 2 - 14)}
          height={2 * (size / 2 - 100)}
          href={image}
          clipPath="url(#myInnerCircle)"
        />
      </svg>
    </div>
  );
};
