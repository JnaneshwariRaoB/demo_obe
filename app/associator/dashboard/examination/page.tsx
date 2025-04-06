"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const tabs = [
  "Question paper",
  "Course Details",
  "Internal Test 1",
  "Internal Test 2",
  "Internal Test 3",
  "Assignments",
  "Final Exam",
];

export default function EvaluatePage() {
  const [activeTab, setActiveTab] = useState("Course Details");
  const [setTarget, setSetTarget] = useState("");
  const [classTarget, setClassTarget] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [avgCO1, setAvgCO1] = useState("0.00");
  const [avgCO2, setAvgCO2] = useState("0.00");

  const pathname = usePathname();
  const department = decodeURIComponent(pathname.split("/")[2] || "Unknown");

  // Auto-generate random values for Course Details tab
  useEffect(() => {
    if (activeTab === "Course Details" && !submitted) {
      const randomSetTarget = (50 + Math.random() * 30).toFixed(0);
      const randomClassTarget = (40 + Math.random() * 20).toFixed(0);
      setSetTarget(randomSetTarget);
      setClassTarget(randomClassTarget);
      setSubmitted(true);
    }
  }, [activeTab, submitted]);

  return (
    <div className="flex min-h-screen bg-[#1F1B2E] text-white">
      <aside className="w-60 bg-[#322348] p-6 border-r border-[#7E5AC8] space-y-4">
        <h2 className="text-xl font-semibold mb-4">Evaluate</h2>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (tab !== "Course Details") setSubmitted(false); // Reset for other tabs
            }}
            className={`block w-full text-left px-4 py-2 rounded-md hover:bg-[#7E5AC8] ${
              activeTab === tab ? "bg-[#7E5AC8]" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </aside>

      <main className="flex-1 p-8 space-y-6">
        <h1 className="text-2xl font-bold text-[#C8B5E9]">
          Department: {department}
        </h1>

        {activeTab === "Course Details" && (
          <div className="bg-[#2B1F3A] p-6 rounded-xl border border-[#7E5AC8] space-y-4">
            <h2 className="text-xl font-semibold">Evaluation Targets (Auto-Generated)</h2>
            <div className="mt-6 bg-[#3C2E54] p-4 rounded-lg border border-purple-700 space-y-2">
              <p>
                <span className="font-semibold">Set Target (%):</span>{" "}
                {setTarget}
              </p>
              <p>
                <span className="font-semibold">Class Target (%):</span>{" "}
                {classTarget}
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-6 mt-4">
          <div className="bg-[#4B3B6B] rounded-lg p-4 shadow-md w-40 text-center">
            <p className="text-sm text-gray-300">CO1 Attainment</p>
            <p className="text-2xl font-bold text-green-400">{avgCO1}%</p>
          </div>
          <div className="bg-[#4B3B6B] rounded-lg p-4 shadow-md w-40 text-center">
            <p className="text-sm text-gray-300">CO2 Attainment</p>
            <p className="text-2xl font-bold text-green-400">{avgCO2}%</p>
          </div>
        </div>

        {["Internal Test 1", "Internal Test 2", "Internal Test 3", "Assignments", "Final Exam"].includes(activeTab) && (
          <div>
            {/* Replace this with the actual MarksEntry component once defined */}
            <p className="text-red-500">MarksEntry component is not yet implemented.</p>
          </div>
        )}

        {activeTab === "Question paper" && (
          <div className="bg-[#2B1F3A] p-6 rounded-xl border border-[#7E5AC8] space-y-6">
            <h2 className="text-xl font-semibold text-[#E0D4FA]">
              Question Papers
            </h2>
            {["CIE 1", "CIE 2", "CIE 3", "Final Exam"].map((title) => (
              <div key={title} className="border-l-4 border-purple-500 pl-4 py-4 bg-[#3C2E54] rounded-md shadow-md">
                <h3 className="text-lg font-bold text-orange-300">{title}</h3>
                <div className="mt-2">
                  <img
                    src="https://website-assets.studocu.com/img/document_thumbnails/624696bf8a900f65c3f6d8344cdc960d/thumb_1200_1553.png"
                    alt={`${title} Paper`}
                    className="rounded-md border border-purple-700 w-full max-w-md"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
