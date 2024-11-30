"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Color } from "three";
import { grey } from "@mui/material/colors";
import { FcLike } from "react-icons/fc";
import { LiaComments } from "react-icons/lia";
import { FcShare } from "react-icons/fc";
import { Description } from "@radix-ui/react-toast";
import { FaShoppingCart } from "react-icons/fa";

useGLTF.preload("/models/jay.glb");
interface Card {
    title: string;
    description?: string;
  }

export const ModelCard: React.FC<Card> = ({ title,description }) => {
  const { scene } = useGLTF("/models/jay.glb");



  return (
    <div className="flex flex-col md:w-64 md:h-96 w-full h-[500px] bg-blue-50 rounded-lg p-2 shadow-lg shadow-blue-200 border-1">
      <Canvas shadows className="bg-white rounded-lg">
        <ambientLight intensity={1} />
        <pointLight position={[-10, 0, 10]} intensity={300} />
        {/* <meshStandardMaterial /> */}
        <primitive object={scene} />
        <OrbitControls enableZoom={true} />
      </Canvas>
      <div className="flex flex-col w-full">
        <div className="flex pt-1 text-xl justify-center text-gray-600 ">{title}</div>
        <div className=" text-gray-400 w-auto line-clamp-2">{description}</div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-start gap-2">
          <button className="hover:scale-110 transition-transform">
        <FcLike  size={25}/>
        </button>
        <button className="hover:scale-110 transition-transform">
        <LiaComments size={25}/>
        </button>
        <button className="hover:scale-110 transition-transform">
        <FcShare size={25}/>
        </button>

          </div>
          <button className="flex flex-row items-center gap-2 button px-4 py-2 rounded-full bg-blueColor text-white"><FaShoppingCart/>BUY</button>
        </div>
      </div>
    </div>
  );
};
