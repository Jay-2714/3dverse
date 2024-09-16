import React from 'react';

interface GradButtonProps{
 title: string;
 onClick:() => void;
}
export function GradButton({ title, onClick }: GradButtonProps) {
    return(
      <button
      className="relative px-6 py-2  text-white font-bold text-lg transition-all duration-300 ease-in-out overflow-hidden group"
      onClick={onClick}
      style={{
        backgroundColor: "#00bfff",
        boxShadow: `0 4px 6px rgba(0, 0, 0, 0.3), inset 0 -4px 4px rgba(0, 0, 0, 0.4), inset 0 4px 4px rgba(255, 255, 255, 0.7)`,
      }}
    >
      <span className="relative z-10">{title}</span>
      <span
        className="absolute inset-0 bg-white opacity-30 transform scale-x-0 group-hover:scale-x-100"
        style={{
          background: `linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.2))`,
        }}
      ></span>
      <span
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
        style={{
          boxShadow: `inset 0 -2px 4px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.8)`,
        }}
      ></span>
    </button>
    );
}

      