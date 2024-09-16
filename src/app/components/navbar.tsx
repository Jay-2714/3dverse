"use client";
import { useRouter } from "next/navigation";
import React from "react";

const navItems = [
  { name: "Models", color: "#00bfff" },
  { name: "Scenes", color: "#00bfff" },
  { name: "Intros", color: "#00bfff" },
  { name: "Characters", color: "#00bfff" },
];

export function NavBar() {
  const router = useRouter();
  return (
    <div className="">
      <nav
        className="flex flex-row justify-between relative w-full bg-gray-100   shadow-xl overflow-hidden"
        style={{
          background: "#96d9ff",
          boxShadow:
            "0 6px 12px rgba(0, 0, 0, 0.1), inset 0 -4px 4px rgba(0, 0, 0, 0.1), inset 0 4px 4px rgba(255, 255, 255, 0.5)",
        }}
      >
        <div className="flex flex-row">
          <div
            className="relative overflow-hidden"
            style={{
              backgroundColor: "#00bfff",
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.3), inset 0 -4px 4px rgba(0, 0, 0, 0.4), inset 0 4px 4px rgba(255, 255, 255, 0.7)`,
            }}
          >
            <img
              className=" w-20 p-2 rounded-xl"
              src="" alt="hi"
            ></img>
          </div>
          <ul className="flex flex-row justify-start ml-7 p-3 gap-4 items-center relative z-10">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  className="relative px-6 py-3 rounded-xl text-white font-bold text-lg transition-all duration-300 ease-in-out overflow-hidden group"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 4px 6px rgba(0, 0, 0, 0.3), inset 0 -4px 4px rgba(0, 0, 0, 0.4), inset 0 4px 4px rgba(255, 255, 255, 0.7)`,
                  }}
                >
                  <span className="relative z-10">{item.name}</span>
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
              </li>
            ))}
          </ul>
        </div>
        <button
          className="relative px-6 py-2  text-white font-bold text-lg transition-all duration-300 ease-in-out overflow-hidden group"
          style={{
            backgroundColor: "#00bfff",
            boxShadow: `0 4px 6px rgba(0, 0, 0, 0.3), inset 0 -4px 4px rgba(0, 0, 0, 0.4), inset 0 4px 4px rgba(255, 255, 255, 0.7)`,
          }}
          onClick={() => router.push('/auth/login')}
        >
          <span className="relative z-10">LOGIN</span>
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
      </nav>
    </div>
  );
}
