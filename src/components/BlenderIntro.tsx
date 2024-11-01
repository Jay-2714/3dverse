"use client"
import React, { useState } from "react";

export const BlenderIntro = () => {
  const [value, setValue] = useState("");

  const  updateIntro = async () => {
    try{
      const res = await fetch('/api/intro',
        {method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({intro: value}),
        }
      );
      const result = await res.json();
      if(result.ok){
          console.log(result.message);
      }
      else{
        console.log("failed to update intro");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  }

  return (
    <>
      <input type="text" placeholder="Text name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="text-black" />
      <button className="bg-gray-300 p-5" onClick={updateIntro}>Done</button>
    </>
  );
};
