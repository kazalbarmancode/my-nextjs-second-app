"use client";
import { signIn, signUp } from "@/lib/auth-client";
import { Envelope, Eye, EyeSlash } from "@gravity-ui/icons";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import React, { useState } from "react";

const Page = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { data: resdata, error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/signIn",
    });

    console.log("signup page", resdata, error);
  };

  const handleGoogleSignIn = async () => {
    const resData = await signIn.social({
      provider: "google",
    });
    console.log("google sign in", resData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md p-8 bg-slate-800 rounded-2xl shadow-xl border border-slate-700">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Create an Account
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Sign up to get started with your account
          </p>
        </div>

        {/* Form */}
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* Name Field */}
          <TextField
            isRequired
            name="name"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-slate-300">Name</Label>
            <Input
              placeholder="John Doe"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-slate-300">Email</Label>
            <Input
              placeholder="john@example.com"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Password Field with Eye Toggle */}
          <TextField
            isRequired
            name="password"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-slate-300">Password</Label>
            <InputGroup className="relative flex items-center">
              <InputGroup.Input
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-12"
                type={isVisible ? "text" : "password"}
              />
              <InputGroup.Suffix className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button
                  isIconOnly
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  size="sm"
                  variant="ghost"
                  className="text-slate-400 hover:text-white p-1"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Eye className="size-5" />
                  ) : (
                    <EyeSlash className="size-5" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <Description className="text-xs text-slate-400 mt-1">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <Button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg shadow-md transition-colors duration-200 cursor-pointer"
            >
              Sign Up
            </Button>
            <Button
              type="reset"
              className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Reset
            </Button>
          </div>
        </Form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="border-t border-slate-700 w-full"></div>
          <span className="bg-slate-800 px-3 text-xs text-slate-400 absolute font-medium">
            OR
          </span>
        </div>

        {/* Social Sign-In */}
        <Button
          onClick={handleGoogleSignIn}
          className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Page;