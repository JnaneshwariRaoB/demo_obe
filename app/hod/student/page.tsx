"use client";
import React, { useState } from "react";

// Sample Initial Students
const initialStudents = [
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
];

// Utilities for Random Student Generation
const sectionLetters = ["A", "B", "C", "D", "E"];
const names = ["Anjali", "Rahul", "Sneha", "Kiran", "Divya", "Suresh", "Neha", "Manoj", "Pooja", "Vikram", "Ayesha", "Rohan"];
const generateRandomName = () => names[Math.floor(Math.random() * names.length)];

const generateStudent = (section: string, index: number, batch: string) => {
  const name = generateRandomName() + " " + section + (index + 1);
  return {
    name,
    usn: `4SF${Math.floor(21 + Math.random() * 2)}IS${(100 + index).toString().padStart(3, "0")}`,
    semester: "6th Semester",
    section,
    batch,
    email: `${name.toLowerCase().replace(" ", ".")}@sahyadri.edu.in`,
  };
};

export default function StudentManager() {
  const [batch, setBatch] = useState("");
  const [intake, setIntake] = useState(0);
  const [generatedSections, setGeneratedSections] = useState<string[]>([]);
  const [generatedStudents, setGeneratedStudents] = useState<Record<string, any[]>>({});
  const [showGenerated, setShowGenerated] = useState(false);

  const handleAddBatch = () => {
    if (!batch || intake <= 0) {
      alert("Enter valid batch and intake.");
      return;
    }

    const count = Math.ceil(intake / 60);
    const newSections = sectionLetters.slice(0, count);
    const studentObj: Record<string, any[]> = {};

    newSections.forEach((sec) => {
      studentObj[sec] = Array.from({ length: 60 }, (_, i) =>
        generateStudent(sec, i, batch)
      );
    });

    setGeneratedSections(newSections);
    setGeneratedStudents(studentObj);
    setShowGenerated(true);
  };

  return (
    <div className="min-h-screen p-6 bg-[#1e1b2e] font-serif text-white">
      {/* Header */}
      <div className="text-center mb-6 bg-[#3F3147] p-4 rounded-xl shadow-md border border-[#9C88B8]">
        <h3 className="text-2xl md:text-3xl font-bold text-white">Sahyadri College of Engineering and Management</h3>
        <h4 className="text-lg md:text-xl font-medium text-[#A786DF] mt-1">Department of Information Science & Engineering</h4>
      </div>

      {/* Batch Input */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter Batch (e.g. 2023 - 2027)"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#3F3147] text-white border border-[#9C88B8] w-72"
        />
        <input
          type="number"
          placeholder="Enter Intake (e.g. 180)"
          value={intake}
          onChange={(e) => setIntake(Number(e.target.value))}
          className="px-4 py-2 rounded-lg bg-[#3F3147] text-white border border-[#9C88B8] w-60"
        />
        <button
          onClick={handleAddBatch}
          className="bg-[#7E5AC8] hover:bg-[#9B72CF] text-white font-bold py-2 px-6 rounded-lg shadow-md"
        >
          Add Batch
        </button>
        {generatedSections.length > 0 && (
          <button
            onClick={() => setShowGenerated(!showGenerated)}
            className="bg-[#3F3147] hover:bg-[#574066] text-white font-semibold py-2 px-6 rounded-lg shadow-md"
          >
            {showGenerated ? "Hide Generated" : "View Students"}
          </button>
        )}
      </div>

      {/* Initial Students */}
      <h2 className="text-xl font-bold text-[#EADCF9] mb-4">Initial Students</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {initialStudents.map((student, index) => (
          <div
            key={index}
            className="bg-[#3F3147] border border-[#9C88B8] p-6 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-lg font-bold">{student.name}</h3>
            <p className="text-[#A786DF] font-medium">{student.usn}</p>
            <p><span className="font-semibold">Semester:</span> {student.semester}</p>
            <p><span className="font-semibold">Section:</span> {student.section}</p>
            <p><span className="font-semibold">Batch:</span> {student.batch}</p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a href={`mailto:${student.email}`} className="text-[#A786DF] hover:underline">
                {student.email}
              </a>
            </p>
          </div>
        ))}
      </div>

      {/* Generated Students */}
      {showGenerated && (
        <>
          <h2 className="text-xl font-bold text-[#EADCF9] mb-4">Generated Students — Batch {batch}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedSections.map((section) => (
              <div
                key={section}
                className="bg-[#3F3147] border border-[#9C88B8] p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-bold text-center text-[#A786DF] mb-3">
                  Section {section}
                </h3>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  {generatedStudents[section]?.slice(0, 6).map((s, i) => (
                    <li key={i}>{s.name}</li>
                  ))}
                  <li>...and more</li>
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
