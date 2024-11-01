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
import { auth } from "../../../../firebase/fb";
import { setRole } from "../../../../redux/roles/roleSlice";
import { Role } from "../../../../redux/roles/roleSlice";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
import { Box, Divider } from "@mui/material";
import { useRouter } from "next/navigation";

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
    try {
      if (auth.currentUser?.emailVerified) {
        await signInWithEmailAndPassword(auth, username, password);
        toast.success("Logged in successfully!");
        setUsername("");
        setPassword("");
        if (username == "jaysanjaymhatre2714@gmail.com") {
          dispatch(setRole(Role.admin));
        } else {
          dispatch(setRole(Role.user));
        }
        router.push('/');
      } else {
        toast.error("Please verify your email address first.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An error occurred while logging in.");
      }
    }
  };

  const facebooklogin = () => {
    const provider = new FacebookAuthProvider();
    try {
    signInWithPopup(auth, provider)
    .then(() => {
      toast.success("Logged in successfully!");

    })
    }
    catch (error) {
      console.error(error);
    }
  }
  
  const twitterLogin = async () => {
    const provider = new TwitterAuthProvider();
    try {
    await signInWithPopup(auth, provider)
    .then((res) => {
     console.log(res);
      toast.success("Logged in successfully!");
    })
    }
    catch (error) {
      console.error(error);
    }
  }

  const googlelogin = async () => {
    const provider = new GoogleAuthProvider();
    try{
       await signInWithPopup(auth, provider)
      .then(() => {
        
        toast.success("Logged in successfully!");
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen ">
      <div className="relative h-auto min-w-72 w-1/2 max-w-96 rounded-xl bg-blue-100 flex flex-col p-4 _3d  ">
        <form
          onSubmit={handleLogin}
          className="flex gap-10 flex-col justify-center px-3 items-center"
        >
          <div className="p-3 rounded-xl bg-blue-300 font-Roboto font-extrabold text-white  ">
            LOGIN
          </div>
          <TextField3d
            ParentCss="w-full"
            leadingIcon={<EmailIcon className="text-white" />}
            className="bg-blue-300 button p-5 focus:bg-blue-300 rounded-lg active:bg-blue-300 text-white text-Roboto placeholder:text-white"
            change={(e) => setUsername(e.target.value)}
            onClick={() => console.log()}
            placeholder="USERNAME"
            value={username}
            type="text"
          />
          <TextField3d
            ParentCss="w-full"
            leadingIcon={<KeyIcon className="text-white" />}
            className="bg-blue-300 button focus:outline-none p-5  focus:bg-blue-300 active:bg-blue-300 rounded-lg text-white outline-none placeholder:text-white"
            value={password}
            change={(e) => setPassword(e.target.value)}
            type={isPasswordVisible ? "text" : "password"}
            placeholder={"PASSWORD"}
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
            className=" flex p-3 rounded-xl bg-blue-300 text-white font-bold button"
            type="submit"
            onClick={handleLogin}
          >
            LOGIN
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
        <button className=" flex p-3 rounded-full bg-blue-300 text-white font-bold button mb-3"
        onClick={googlelogin}>
          <FcGoogle size={30} className="bg-white rounded-full"/>
        </button>
        <button className=" flex p-3 rounded-full bg-blue-300 text-white font-bold button mb-3"
        onClick={facebooklogin}>
          <FaFacebook color="#1475f3" size={30} className="bg-white rounded-full p-[2px]" /> 
        </button>
        <button className=" flex p-3 rounded-full bg-blue-300 text-white font-bold button mb-3"
        onClick={twitterLogin}>
          <FaXTwitter color="white" size={30} className="bg-black rounded-full p-[2px]" /> 
        </button>
        </div>
      </div>
    </div>
  );
}
