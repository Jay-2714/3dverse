"use client";
import TextField3d from "@/components/TextField3d";
import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setRole } from "../../../../redux/roles/roleSlice";
import { Role } from "../../../../redux/roles/roleSlice";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Box, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import prisma from "@/lib/db";
import z from "zod";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";


enum Auth {
  "google",
  "github",
  "twitter",
}

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    setUsername("");
    setPassword("");
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPasswordVisible((prev) => !prev);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000", {
      method: "POST",
      headers: {"Conten-Type":"application/json"},
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const data = await res.json();
      const userId = data.userId;
      if (username == process.env.ADMIN ) {
        dispatch(setRole(Role.admin));
        router.push("/");
      }
      else{
        dispatch(setRole(Role.user));
        router.push("/");
      }
    }
    else{
      toast.error("Login failed. Please check your credentials.");
      return;
    }
  
    
  };

  const storeToken = async (userId: string, token: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, token }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to store token");
      }
  
      console.log("Token stored successfully.");
    } catch (error) {
      console.error("Error in storeToken:", error);
    }
  };
  


  const socialLogin = async (Authprovider: Auth ) => {
    if(Authprovider == Auth.github) {
    const data = await authClient.signIn.social({
        provider: "github",
    });}
    else if(Authprovider == Auth.google) {
    const data = await authClient.signIn.social({
        provider: "google",
    });
    }
  }



  return (
    <div className="flex items-center justify-center h-screen w-screen ">
      <div className="relative h-auto min-w-72 w-1/2 max-w-96 rounded-xl bg-blue-100 flex flex-col p-4 _3d  ">
        <form
          onSubmit={handleLogin}
          className="flex gap-10 flex-col justify-center px-3 items-center"
        >
          <div className="p-3 rounded-xl bg-blueColor font-Roboto font-extrabold text-white  ">
            Login
          </div>
          <TextField3d
            ParentCss="w-full"
            leadingIcon={<EmailIcon className="text-white" />}
            className="bg-blueColor button p-5 focus:bg-blueColor rounded-lg active:bg-blueColor text-white text-Roboto placeholder:text-white"
            change={(e) => setUsername(e.target.value)}
            onClick={() => console.log()}
            placeholder="Email"
            value={username}
            type="text"
          />
          <TextField3d
            ParentCss="w-full"
            leadingIcon={<KeyIcon className="text-white" />}
            className="bg-blueColor button focus:outline-none p-5  focus:bg-blueColor active:bg-blueColor rounded-lg text-white outline-none placeholder:text-white"
            value={password}
            change={(e) => setPassword(e.target.value)}
            type={isPasswordVisible ? "text" : "password"}
            placeholder={"Password"}
            onClick={() => console.log("Function not implemented.")}
            trailingIcon={
              isPasswordVisible ? (
                <VisibilityOffIcon
                  key="off"
                  className="text-white"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <VisibilityIcon
                  key="on"
                  className="text-white"
                  onClick={togglePasswordVisibility}
                />
              )
            }
          />
          <button
            className=" flex p-5 w-full rounded-xl justify-center bg-blue-500 text-white font-bold button"
            type="submit"
            onClick={handleLogin}
          >
            LOG IN WITH EMAIL
          </button>
          <span>{"Haven't registered yet?"}
          <a href="./register" className="text-blue-500 underline">click here</a></span>
        </form>
        <Box sx={{ width: '100%', my: 2 }}>
          <Divider variant="middle">
            <span className="text-gray-400 text-sm">or continue with</span>
          </Divider>
        </Box>
        <div className="flex flex-row justify-evenly w-full">
        <button className=" flex p-3 rounded-full bg-blue-500 text-white font-bold button mb-3"
        onClick={()=>socialLogin(Auth.google)}>
          <FcGoogle size={30} className="bg-white rounded-full"/>
        </button>
        <button className=" flex p-3 rounded-full bg-blue-500 text-white font-bold button mb-3"
        onClick={()=> socialLogin(Auth.github)}>
          <FaFacebook color="#1475f3" size={30} className="bg-white rounded-full p-[2px]" /> 
        </button>
        <button className=" flex p-3 rounded-full bg-blue-500 text-white font-bold button mb-3"
        onClick={() => socialLogin(Auth.twitter)}>
          <FaXTwitter color="white" size={30} className="bg-black rounded-full p-[2px]" /> 
        </button>
        </div>
      </div>
    </div>
  );
}
