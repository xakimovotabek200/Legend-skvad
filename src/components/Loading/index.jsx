import React from "react";

const index = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-20 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient
            id="a12"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)"
          >
            <stop offset="0" stopColor="#2E57FF"></stop>
            <stop offset=".3" stopColor="#2E57FF" stopOpacity=".9"></stop>
            <stop offset=".6" stopColor="#2E57FF" stopOpacity=".6"></stop>
            <stop offset=".8" stopColor="#2E57FF" stopOpacity=".3"></stop>
            <stop offset="1" stopColor="#2E57FF" stopOpacity="0"></stop>
          </radialGradient>
          <circle
            transform-origin="center"
            fill="none"
            stroke="url(#a12)"
            strokeWidth={17}
            strokeLinecap="round"
            strokeDasharray="200 1000"
            strokeDashoffset={0}
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
          <circle
            transform-origin="center"
            fill="none"
            opacity=".2"
            stroke="#2E57FF"
            strokeWidth={17}
            strokeLinecap="round"
            cx="100"
            cy="100"
            r="70"
          ></circle>
        </svg>
      </div>
      <div className="text-center">
        <p>Ma'lumot yuklanmoqda</p>
      </div>
    </div>
  );
};

export default index;
