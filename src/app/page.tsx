"use client"
import { GradButton } from "./components/gradientButton";
import { NavBar } from "./components/navbar";
import React from "react";
export default function home(){
  const tp = (): void =>{

  }
  
  return(<>
    <NavBar/>
    <GradButton title="sd" onClick={tp}/>
    </>
  );
}