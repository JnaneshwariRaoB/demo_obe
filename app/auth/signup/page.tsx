"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Admin account created successfully!");
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#2C2233] to-[#3F2D47] p-8 font-serif text-white">
      <div className="bg-[#4B3B5C] shadow-2xl rounded-3xl p-8 w-full max-w-md border-4 border-[#A786DF]">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Admin Sign Up</h1>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-[#A786DF] rounded-xl bg-[#5A476D] text-white placeholder-[#D1C1EB] focus:outline-none focus:ring-2 focus:ring-[#A786DF] shadow-md"
          />
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-[#A786DF] rounded-xl bg-[#5A476D] text-white placeholder-[#D1C1EB] focus:outline-none focus:ring-2 focus:ring-[#A786DF] shadow-md"
          />
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border-2 border-[#A786DF] rounded-xl bg-[#5A476D] text-white placeholder-[#D1C1EB] focus:outline-none focus:ring-2 focus:ring-[#A786DF] shadow-md"
          />
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="mr-2 accent-[#A786DF]"
              onChange={() => setPasswordVisible(!passwordVisible)}
            />
            Show Password
          </label>
          <button
            onClick={handleSignup}
            className="w-full bg-gradient-to-r from-[#A786DF] to-[#6A4C93] text-white py-2 rounded-xl hover:from-[#6A4C93] hover:to-[#A786DF] shadow-lg transition duration-300"
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full text-sm underline mt-2 text-[#D1C1EB] hover:text-[#A786DF] transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
