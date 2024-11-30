"use client"
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image  from "next/image";

const NavBar: React.FC= () => {
   interface NavElements{
     name: string;
     color: string;
     path: string;
   }
  
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<string>("MODELS");
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  const navItems: NavElements[] = [
    { name: "HOME", color: "#00bfff", path:""},
    { name: "MODELS", color: "#00bfff", path: "/" },
    { name: "SCENES", color: "#00bfff", path: "/" },
    { name: "INTROS", color: "#00bfff", path: "/screens" },
    { name: "CHARACTERS", color: "#00bfff", path: "" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = (item: NavElements) => {
    setSelectedItem(item.name);
    setClickedItem(item.name);
    setTimeout(() => setClickedItem(null), 300);
    router.push(item.path);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <nav
        className="flex flex-col md:flex-row justify-between relative w-full bg-[#d6e9fa] shadow-xl overflow-hidden"
        style={{
          boxShadow:
            "0 6px 12px rgba(0, 0, 0, 0.1), inset 0 -4px 4px rgba(0, 0, 0, 0.1), inset 0 4px 4px rgba(255, 255, 255, 0.5)",
        }}
      >
        <div className="flex justify-between items-center p-4 md:p-0">
          <div
            className="relative overflow-hidden h-full"
            style={{
              backgroundColor: "#00bfff",
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.3), inset 0 -4px 4px rgba(0, 0, 0, 0.4), inset 0 4px 4px rgba(255, 255, 255, 0.7)`,
            }}
          >
            <Image className="w-20 h-full p-2 rounded-xl" src={""} alt=""></Image>
          </div>
          {isMobile && (
            <button
              
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-4 _3d"
            >
            </button>
          )}
        </div>
        <ul className={`flex flex-col md:flex-row justify-start md:ml-7 p-3 gap-4 items-center relative z-10 ${isMobile && !isMenuOpen ? 'hidden' : 'flex'}`}>
          {navItems.map((item) => (
            <li key={item.name} className="w-full md:w-auto ">
              <button
                className={`relative px-6 py-3 rounded-xl text-white hover:scale-110 font-bold text-lg transition-all duration-200 transform active:scale-90 focus:scale-100 ease-in-out overflow-hidden group group-hover:animate-click w-full md:w-auto
                  ${selectedItem === item.name ? 'text-[#ffffff]'  : 'hover:text-[#ffffff]'
                } ${clickedItem === item.name ? 'animate-click' : ''}`}
                style={{
                  backgroundColor: item.color,
                  boxShadow: selectedItem === item.name ? `0 2px 0px rgba(0, 0, 0, 0.01), inset 0 -4px 2px rgba(0, 0, 0, 0.02), inset 0 4px 4px rgba(255, 255, 255, 0.2)`:
                  `0 4px 6px rgba(0, 0, 0, 0.3), inset 0 -4px 4px rgba(0, 0, 0, 0.4), inset 0 4px 4px rgba(255, 255, 255, 0.7)`,
                }}
                onClick={() => handleItemClick(item)}
              >
                <span className="relative z-10">{item.name}</span>
                {selectedItem !== item.name && (
                  <span
                    className="absolute inset-0 transform scale-x-0"
                    style={{
                      background: item.color,
                      boxShadow: `0 4px 6px rgba(0, 0, 0, 0.3), inset 0 -4px 4px rgba(0, 0, 0, 0.4), inset 0 4px 4px rgba(255, 255, 255, 0.7)`,
                    }}
                  ></span>
                )}
              </button>
            </li>
          ))}
          <li className="w-full md:w-auto md:ml-auto">

          </li>
        </ul>
        <button
              className="relative px-6 py-2 text-white font-bold text-lg transition-all duration-300 ease-in-out overflow-hidden group w-full md:w-auto"
              style={{
                backgroundColor: "#00bfff",
                boxShadow: `0 4px 6px rgba(0, 0, 0, 0.3), inset 0 -4px 4px rgba(0, 0, 0, 0.4), inset 0 4px 4px rgba(255, 255, 255, 0.7)`,
              }}
              onClick={() => router.push('/login')}
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
export default NavBar;