"use client";
import TextField3d from "@/components/TextField3d";
import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Box, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "@/lib/auth-client";
import LoadingSpinner from "@/components/LoadingSpinner";

enum SocialProvider {
  "google" = "google",
  "github" = "github", 
  "twitter" = "twitter",
}

export default function Login() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  
  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    // Redirect if already authenticated
    if (session && !isPending) {
      router.push("/dashboard");
    }
  }, [session, isPending, router]);

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
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPasswordVisible((prev) => !prev);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });
      
      if (error) {
        toast.error(error.message || "Login failed");
      } else {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLogin = async (provider: SocialProvider) => {
    try {
      const { data, error } = await signIn.social({
        provider: provider,
        callbackURL: "/dashboard",
      });
      
      if (error) {
        toast.error(`${provider} login failed: ${error.message}`);
      } else {
        toast.success(`${provider} login successful!`);
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(`${provider} login failed: ${error.message}`);
    }
  };

  // Show loading spinner while checking authentication
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <LoadingSpinner message="Checking authentication..." />
      </div>
    );
  }

  // Show loading spinner while submitting
  if (isSubmitting) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <LoadingSpinner message="Signing you in..." />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="relative h-auto min-w-72 w-1/2 max-w-96 rounded-xl bg-blue-100 flex flex-col p-4 _3d">
        <form
          onSubmit={handleLogin}
          className="flex gap-6 flex-col justify-center px-3 items-center"
        >
          <div className="p-3 rounded-xl bg-blueColor font-Roboto font-extrabold text-white">
            Login
          </div>
          
          {/* Email Field */}
          <div className="w-full">
            <TextField3d
              ParentCss="w-full"
              leadingIcon={<EmailIcon className="text-white" />}
              className={`bg-blueColor button p-5 focus:bg-blueColor rounded-lg active:bg-blueColor text-white text-Roboto placeholder:text-white ${
                emailError ? 'border-2 border-red-500' : ''
              }`}
              change={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              onClick={() => console.log()}
              placeholder="Email"
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
              className={`bg-blueColor button focus:outline-none p-5 focus:bg-blueColor active:bg-blueColor rounded-lg text-white outline-none placeholder:text-white ${
                passwordError ? 'border-2 border-red-500' : ''
              }`}
              value={password}
              change={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              type={isPasswordVisible ? "text" : "password"}
              placeholder={"Password"}
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

          <button
            className="flex p-5 w-full rounded-xl justify-center bg-blue-500 text-white font-bold button hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'SIGNING IN...' : 'LOG IN WITH EMAIL'}
          </button>
          
          <span>
            {"Haven't registered yet? "}
            <a href="./register" className="text-blue-500 underline hover:text-blue-600">
              click here
            </a>
          </span>
        </form>
        
        <Box sx={{ width: '100%', my: 2 }}>
          <Divider variant="middle">
            <span className="text-gray-400 text-sm">or continue with</span>
          </Divider>
        </Box>
        
        <div className="flex flex-row justify-evenly w-full">
          <button 
            className="flex p-3 rounded-full bg-blue-500 text-white font-bold button mb-3 hover:bg-blue-600 transition-colors"
            onClick={() => socialLogin(SocialProvider.google)}
            type="button"
          >
            <FcGoogle size={30} className="bg-white rounded-full"/>
          </button>
          
          <button 
            className="flex p-3 rounded-full bg-blue-500 text-white font-bold button mb-3 hover:bg-blue-600 transition-colors"
            onClick={() => socialLogin(SocialProvider.github)}
            type="button"
          >
            <FaGithub color="white" size={30} className="rounded-full p-[2px]" /> 
          </button>
          
          <button 
            className="flex p-3 rounded-full bg-blue-500 text-white font-bold button mb-3 hover:bg-blue-600 transition-colors"
            onClick={() => socialLogin(SocialProvider.twitter)}
            type="button"
          >
            <FaXTwitter color="white" size={30} className="bg-black rounded-full p-[2px]" /> 
          </button>
        </div>
      </div>
    </div>
  );
}
