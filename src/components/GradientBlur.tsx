"use client";

import React from "react";

export const GradientBlur = () => {
  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center">
      <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-[150px]" />
      <div className="absolute h-[400px] w-[400px] rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-25 blur-[100px]" />
    </div>
  );
};
