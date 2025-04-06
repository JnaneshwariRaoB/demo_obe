"use client";
import React from "react";

const facultyMembers = [
  {
    name: "Dr. Asha Rao",
    designation: "Professor & HOD",
    qualification: "Ph.D. in Computer Science",
    experience: "18 years",
    email: "asha.rao@sahyadri.edu.in",
  },
  {
    name: "Mr. Ramesh Shetty",
    designation: "Assistant Professor",
    qualification: "M.Tech in Information Science",
    experience: "10 years",
    email: "ramesh.shetty@sahyadri.edu.in",
  },
  {
    name: "Ms. Sneha K",
    designation: "Assistant Professor",
    qualification: "M.Tech in Data Science",
    experience: "5 years",
    email: "sneha.k@sahyadri.edu.in",
  },
];

export default function FacultyList() {
  return (
    <div className="min-h-screen p-6 bg-[#1e1b2e] font-serif text-white">
      {/* College + Department Heading */}
      <div className="text-center mb-6 bg-[#3F3147] p-4 rounded-xl shadow-md border border-[#9C88B8]">
        <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm">
          Sahyadri College of Engineering and Management
        </h3>
        <h4 className="text-lg md:text-xl font-medium text-[#A786DF] mt-1">
          Department of Information Science & Engineering
        </h4>
      </div>

      {/* Faculty Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {facultyMembers.map((faculty, index) => (
          <div
            key={index}
            className="bg-[#3F3147] border border-[#9C88B8] p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-1">{faculty.name}</h3>
            <p className="text-[#A786DF] font-medium">{faculty.designation}</p>
            <div className="mt-2 space-y-1 text-sm">
              <p>
                <span className="font-semibold text-white">Qualification:</span>{" "}
                {faculty.qualification}
              </p>
              <p>
                <span className="font-semibold text-white">Experience:</span>{" "}
                {faculty.experience}
              </p>
              <p>
                <span className="font-semibold text-white">Email:</span>{" "}
                {faculty.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
