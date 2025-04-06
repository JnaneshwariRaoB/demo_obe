"use client";
import React, { useState } from "react";

const students = [
  {
    name: "Anjali Rao",
    usn: "4SF21IS001",
    semester: "6th Semester",
    section: "A",
    batch: "2021 - 2025",
    email: "anjali.rao@sahyadri.edu.in",
  },
  {
    name: "Rahul Shetty",
    usn: "4SF21IS002",
    semester: "6th Semester",
    section: "A",
    batch: "2021 - 2025",
    email: "rahul.shetty@sahyadri.edu.in",
  },
  {
    name: "Sneha K",
    usn: "4SF21IS003",
    semester: "6th Semester",
    section: "B",
    batch: "2021 - 2025",
    email: "sneha.k@sahyadri.edu.in",
  },
  {
    name: "Kiran Kumar",
    usn: "4SF21IS004",
    semester: "6th Semester",
    section: "B",
    batch: "2021 - 2025",
    email: "kiran.kumar@sahyadri.edu.in",
  },
  {
    name: "Divya P",
    usn: "4SF21IS005",
    semester: "6th Semester",
    section: "C",
    batch: "2021 - 2025",
    email: "divya.p@sahyadri.edu.in",
  },
  {
    name: "Suresh B",
    usn: "4SF21IS006",
    semester: "6th Semester",
    section: "C",
    batch: "2021 - 2025",
    email: "suresh.b@sahyadri.edu.in",
  },
];

export default function StudentList() {
  const [selectedSection, setSelectedSection] = useState("All");

  const filteredStudents =
    selectedSection === "All"
      ? students
      : students.filter((s) => s.section === selectedSection);

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

      {/* Filter Dropdown */}
      <div className="mb-6 flex justify-center">
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="bg-[#3F3147] text-white border border-[#9C88B8] px-4 py-2 rounded-lg shadow-md focus:outline-none"
        >
          <option value="All">All Sections</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
        </select>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredStudents.map((student, index) => (
          <div
            key={index}
            className="bg-[#3F3147] border border-[#9C88B8] p-6 rounded-xl shadow-md transition transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
          >
            <h3 className="text-xl font-bold mb-1">{student.name}</h3>
            <p className="text-[#A786DF] font-medium">{student.usn}</p>
            <div className="mt-2 space-y-1 text-sm">
              <p>
                <span className="font-semibold text-white">Semester:</span>{" "}
                {student.semester}
              </p>
              <p>
                <span className="font-semibold text-white">Section:</span>{" "}
                {student.section}
              </p>
              <p>
                <span className="font-semibold text-white">Batch:</span>{" "}
                {student.batch}
              </p>
              <p>
                <span className="font-semibold text-white">Email:</span>{" "}
                <a
                  href={`mailto:${student.email}`}
                  className="text-[#A786DF] hover:underline"
                >
                  {student.email}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
