import React from "react";

export default function GiveAndTake() {
  return (
    <div>
      {/* Get $10, Give $10 Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl tracking-[0.3em] mb-4">GET $10, GIVE $10</h2>
        <p className="mb-8">
          Get $10 off your first rental when you join. Share your code and give
          friends $10 too.
        </p>

        <div className="max-w-md mx-auto relative">
          <input
            type="email"
            placeholder="your.Email@example.com"
            className="w-full border-b border-black py-2 pr-10 focus:outline-none"
          />
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
