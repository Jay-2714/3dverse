"use client"
import TextField3d from "@/components/TextField3d";
import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { toast } from "react-hot-toast";
import { auth } from "../../../../firebase/fb";



export default function Register() {
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  


  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPasswordVisible((prev) => !prev);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;
      await sendEmailVerification(user);
      toast.success("Email verification link sent");
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An error occurred while logging in.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen ">
      <div className="min-w-72 w-1/2 max-w-96 rounded-xl bg-blue-100 flex flex-col p-4 _3d items-center">
        <form
          onSubmit={handleRegister}
          className="flex gap-10 flex-col justify-center px-3 items-center"
        >
          <div className="p-3 rounded-xl bg-blue-300 font-Roboto font-extrabold text-white  ">
            REGISTER
          </div>
          <TextField3d
          ParentCss="w-full"
            leadingIcon={<EmailIcon className="text-white" />}
            className="bg-blue-300 button w-full p-5 focus:bg-blue-300 active:bg-blue-300 text-white text-Roboto rounded-lg placeholder:text-white"
            change={(e) => setEmail(e.target.value)}
            onClick={() => console.log()}
            placeholder="EMAIL"
            value={email}
            type="email"
            autocomplete="true"
          />
          <TextField3d
          ParentCss="w-full"
            leadingIcon={<KeyIcon className="text-white" />}
            className="bg-blue-300 w-full focus:bg-blue-300 active:bg-blue-300 button focus:outline-none p-5 rounded-lg text-white outline-none placeholder:text-white"
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
            className=" flex p-3 rounded-xl bg-blue-300 text-white font-bold button mb-3"
            type="submit"
          >
            REGISTER
          </button>
        </form>
        <div className="flex text-[14px] text-gray-500">
          Already have an account?
          <a href="/login" className="text-blue-500 underline">
            Login
          </a>
        </div>


      </div>
    </div>
  );
}
