"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [role, setRole] = useState<"Admin" | "Faculty" | "Student">("Admin");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const router = useRouter();

  const roleDetails = {
    Admin: {
      title: "Admin Portal",
      description: "Manage users and settings",
      bgColor: "from-[#3F3147] to-[#2C2233]",
      logo: "https://allegiance-educare.in/storage/uploads/colleges/thumb/250_250_col14894.jpg",
      route: "/admin/dashboard",
      signupRoute: "/auth/signup",
    },
    Faculty: {
      title: "Faculty Dashboard",
      description: "Access courses and evaluations",
      bgColor: "from-[#3F3147] to-[#2C2233]",
      logo: "https://cdn-icons-png.flaticon.com/512/2995/2995463.png",
      route: "/faculty/dashboard",
    },
    Student: {
      title: "Student Hub",
      description: "View grades and assignments",
      bgColor: "from-[#3F3147] to-[#2C2233]",
      logo: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
      route: "/student/dashboard",
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#2C2233] to-[#3F2D47] p-8 font-serif text-white">
      <div className="flex bg-[#4B3B5C] border-4 border-[#A786DF] shadow-2xl rounded-3xl overflow-hidden" style={{ width: "850px", height: "500px" }}>
        {/* Left Panel */}
        <div className={`flex flex-col items-center justify-center w-1/2 bg-gradient-to-br ${roleDetails[role].bgColor} text-white p-6 rounded-l-3xl`}>
          <img src={roleDetails[role].logo} alt={`${role} Logo`} className="w-28 mb-4 animate-bounce-slow drop-shadow-lg" />
          <h1 className="text-3xl font-bold mb-2">{roleDetails[role].title}</h1>
          <h2 className="text-lg italic text-[#E9DFF6]">{roleDetails[role].description}</h2>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center w-1/2 p-8 bg-[#3F3147] border-l-4 border-[#9C88B8] rounded-r-3xl">
          {/* Role Tabs */}
          <div className="flex justify-center mb-6 space-x-4">
            {["Admin", "Faculty", "Student"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r as "Admin" | "Faculty" | "Student")}
                className={`px-4 py-2 rounded-xl font-bold transition duration-300 shadow-md ${
                  role === r
                    ? "bg-[#A786DF] text-white"
                    : "bg-[#5A476D] text-white hover:bg-[#9370DB]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4 text-center text-white">{resetPassword ? "Reset Password" : `${role} Login`}</h2>

          {resetPassword ? (
            <div className="space-y-3">
              <input type="email" placeholder="Enter your email" className="w-full p-3 border border-[#A786DF] rounded-xl bg-[#5A476D] placeholder-[#C7B3DD] text-white focus:outline-none focus:ring-2 focus:ring-[#A786DF] shadow-sm" />
              <input type="password" placeholder="New Password" className="w-full p-3 border border-[#A786DF] rounded-xl bg-[#5A476D] placeholder-[#C7B3DD] text-white focus:outline-none focus:ring-2 focus:ring-[#A786DF] shadow-sm" />
              <input type="password" placeholder="Confirm Password" className="w-full p-3 border border-[#A786DF] rounded-xl bg-[#5A476D] placeholder-[#C7B3DD] text-white focus:outline-none focus:ring-2 focus:ring-[#A786DF] shadow-sm" />
              <button className="w-full bg-gradient-to-r from-[#A786DF] to-[#6A4C93] text-white py-2 rounded-xl hover:from-[#5D4A75] hover:to-[#9370DB] shadow-lg transition">Update Password</button>
              <button onClick={() => setResetPassword(false)} className="w-full bg-[#6A4C93] text-white py-2 rounded-xl hover:bg-[#5D4A75] transition">Back to Login</button>
            </div>
          ) : (
            <div>
              <div className="space-y-3">
                <input type="email" placeholder="Email" className="w-full p-3 border border-[#A786DF] rounded-xl bg-[#5A476D] placeholder-[#C7B3DD] text-white focus:outline-none focus:ring-2 focus:ring-[#A786DF] shadow-sm" />
                <div className="relative">
                  <input type={passwordVisible ? "text" : "password"} placeholder="Password" className="w-full p-3 border border-[#A786DF] rounded-xl bg-[#5A476D] placeholder-[#C7B3DD] text-white focus:outline-none focus:ring-2 focus:ring-[#A786DF] shadow-sm" />
                  <label className="flex items-center mt-2 text-sm text-white font-semibold">
                    <input type="checkbox" className="mr-2 accent-[#A786DF]" onChange={() => setPasswordVisible(!passwordVisible)} />
                    Show Password
                  </label>
                </div>
              </div>
              <button onClick={() => router.push(roleDetails[role].route)} className="w-full bg-gradient-to-r from-[#A786DF] to-[#6A4C93] text-white py-2 rounded-xl hover:from-[#5D4A75] hover:to-[#9370DB] shadow-lg transition mt-3">Login</button>
              <button onClick={() => setResetPassword(true)} className="w-full text-sm underline mt-2 text-[#C7B3DD] hover:text-[#E9DFF6] transition">Forgot Password?</button>
              {role === "Admin" && (
                <button onClick={() => router.push(roleDetails.Admin.signupRoute)} className="w-full text-sm underline mt-2 text-[#C7B3DD] hover:text-[#E9DFF6] transition">Sign Up</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
