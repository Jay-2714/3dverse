"use client";
import TextField3d from "@/components/TextField3d";
import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Register() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");



  const validateName = (name: string): boolean => {
    if (!name) {
      setNameError("Name is required");
      return false;
    }
    if (name.length < 2) {
      setNameError("Name must be at least 2 characters long");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter, one lowercase letter, and one number");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = (confirmPassword: string, password: string): boolean => {
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      return false;
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
 
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword, password);
    
    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }
      const data = await res.json();
      toast.success("Registration successful! Redirecting to login...");
      
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // if (isPending) {
  //   return (
  //     <div className="flex items-center justify-center h-screen w-screen">
  //       <LoadingSpinner message="Checking authentication..." />
  //     </div>
  //   );
  // }


  if (isSubmitting) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <LoadingSpinner message="Creating your account..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="min-w-72 w-1/2 max-w-96 rounded-xl bg-blue-100 flex flex-col p-4 _3d items-center">
        <form
          onSubmit={handleRegister}
          className="flex gap-6 flex-col justify-center px-3 items-center"
        >
          <div className="p-3 rounded-xl bg-blueColor font-Roboto font-extrabold text-white">
            REGISTER
          </div>
          
          {/* Name Field */}
          <div className="w-full">
            <TextField3d
              ParentCss="w-full"
              leadingIcon={<EmailIcon className="text-white" />}
              className={`bg-blueColor button w-full p-5 focus:bg-blueColor active:bg-blueColor text-white text-Roboto rounded-lg placeholder:text-white ${
                nameError ? 'border-2 border-red-500' : ''
              }`}
              change={(e) => {
                setName(e.target.value);
                validateName(e.target.value);
              }}
              onClick={() => console.log()}
              placeholder="FULL NAME"
              value={name}
              type="text"
            />
            {nameError && (
              <p className="text-red-500 text-sm mt-1 px-2">{nameError}</p>
            )}
          </div>
          
          {/* Email Field */}
          <div className="w-full">
            <TextField3d
              ParentCss="w-full"
              leadingIcon={<EmailIcon className="text-white" />}
              className={`bg-blueColor button w-full p-5 focus:bg-blueColor active:bg-blueColor text-white text-Roboto rounded-lg placeholder:text-white ${
                emailError ? 'border-2 border-red-500' : ''
              }`}
              change={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              onClick={() => console.log()}
              placeholder="EMAIL"
              value={email}
              type="email"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1 px-2">{emailError}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="w-full">
            <TextField3d
              ParentCss="w-full"
              leadingIcon={<KeyIcon className="text-white" />}
              className={`bg-blueColor w-full focus:bg-blueColor active:bg-blueColor button focus:outline-none p-5 rounded-lg text-white outline-none placeholder:text-white ${
                passwordError ? 'border-2 border-red-500' : ''
              }`}
              value={password}
              change={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
                if (confirmPassword) validateConfirmPassword(confirmPassword, e.target.value);
              }}
              type={isPasswordVisible ? "text" : "password"}
              placeholder={"PASSWORD"}
              onClick={() => console.log("Function not implemented.")}
              trailingIcon={
                isPasswordVisible ? (
                  <VisibilityOffIcon
                    key="off"
                    className="text-white cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <VisibilityIcon
                    key="on"
                    className="text-white cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )
              }
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1 px-2">{passwordError}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="w-full">
            <TextField3d
              ParentCss="w-full"
              leadingIcon={<KeyIcon className="text-white" />}
              className={`bg-blueColor w-full focus:bg-blueColor active:bg-blueColor button focus:outline-none p-5 rounded-lg text-white outline-none placeholder:text-white ${
                confirmPasswordError ? 'border-2 border-red-500' : ''
              }`}
              value={confirmPassword}
              change={(e) => {
                setConfirmPassword(e.target.value);
                validateConfirmPassword(e.target.value, password);
              }}
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder={"CONFIRM PASSWORD"}
              onClick={() => console.log("Function not implemented.")}
              trailingIcon={
                isConfirmPasswordVisible ? (
                  <VisibilityOffIcon
                    key="off"
                    className="text-white cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  />
                ) : (
                  <VisibilityIcon
                    key="on"
                    className="text-white cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  />
                )
              }
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1 px-2">{confirmPasswordError}</p>
            )}
          </div>

          {/* Password Requirements */}
          <div className="w-full p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
            <p className="font-semibold mb-1">Password Requirements:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>At least 8 characters long</li>
              <li>One uppercase letter (A-Z)</li>
              <li>One lowercase letter (a-z)</li>
              <li>One number (0-9)</li>
            </ul>
          </div>

          <button
            className="flex p-3 rounded-xl bg-blueColor text-white font-bold button mb-3 w-full justify-center hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'CREATING ACCOUNT...' : 'REGISTER'}
          </button>
        </form>
        
        <div className="flex text-[14px] text-gray-500">
          Already have an account?
          <a href="/login" className="text-blue-500 underline hover:text-blue-600 ml-1">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
