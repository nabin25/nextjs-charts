"use client";

import { useLoadingOverlay } from "@/providers/overlay-state-provider";

const LoadingOverlay = () => {
  const { overlay } = useLoadingOverlay();
  if (!overlay) return;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-100 h-screen"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex space-x-2 rotate-180">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="w-2 bg-blue-500"
            style={{
              animation: `barAnimation 1s ease-in-out ${index * 0.2}s infinite`,
              height: "20px",
              transformOrigin: "bottom", // Ensures bars grow/shrink from the bottom
            }}
          ></div>
        ))}
      </div>
      <style jsx>{`
        @keyframes barAnimation {
          0%,
          100% {
            height: 20px;
          }
          50% {
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;
