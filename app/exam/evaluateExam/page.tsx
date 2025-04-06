"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const tabs = [
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

  const handleSubmit = () => setSubmitted(true);

  return (
    <div className="flex min-h-screen bg-[#1F1B2E] text-white">
      {/* Sidebar */}
      <aside className="w-60 bg-[#322348] p-6 border-r border-[#7E5AC8] space-y-4">
        <h2 className="text-xl font-semibold mb-4">Evaluate</h2>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`block w-full text-left px-4 py-2 rounded-md hover:bg-[#7E5AC8] ${
              activeTab === tab ? "bg-[#7E5AC8]" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6">
        <h1 className="text-2xl font-bold text-[#C8B5E9]">
          Department: {department}
        </h1>

        {activeTab === "Course Details" && (
          <div className="bg-[#2B1F3A] p-6 rounded-xl border border-[#7E5AC8] space-y-4">
            <h2 className="text-xl font-semibold">Set Evaluation Targets</h2>
            <div className="space-y-2">
              <div>
                <label className="block mb-1">Set Target (%):</label>
                <input
                  type="number"
                  value={setTarget}
                  onChange={(e) => setSetTarget(e.target.value)}
                  className="w-full p-2 text-black rounded-md"
                  placeholder="e.g., 60"
                  disabled={submitted}
                />
              </div>
              <div>
                <label className="block mb-1">Class Target (%):</label>
                <input
                  type="text"
                  value={classTarget}
                  onChange={(e) => setClassTarget(e.target.value)}
                  className="w-full p-2 text-black rounded-md"
                  placeholder="e.g., 50"
                  disabled={submitted}
                />
              </div>
              {!submitted && (
                <button
                  onClick={handleSubmit}
                  className="bg-[#7E5AC8] px-6 py-2 rounded-lg hover:bg-purple-700"
                >
                  Submit
                </button>
              )}
            </div>

            {submitted && (
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
            )}
          </div>
        )}

        {/* CO Attainment Cards visible in all tabs */}
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
          <MarksEntry
            setAverages={(co1, co2) => {
              setAvgCO1(co1);
              setAvgCO2(co2);
            }}
          />
        )}
      </main>
    </div>
  );
}

// MarksEntry component (unchanged except for lifting state)
function MarksEntry({ setAverages }: { setAverages: (co1: string, co2: string) => void }) {
  const initialData = Array.from({ length: 15 }, (_, i) => ({
    usn: `4SF21IS0${(i + 1).toString().padStart(2, "0")}`,
    name: `Student ${i + 1}`,
    marks: {
      "1a": 0, "1b": 0, "2a": 0, "2b": 0,
      "3a": 0, "3b": 0, "4a": 0, "4b": 0,
    },
  }));

  const [data, setData] = useState(initialData);

  const handleChange = (
    index: number,
    field: keyof typeof data[0]["marks"],
    value: number
  ) => {
    const updated = [...data];
    updated[index].marks[field] = value;
    setData(updated);
  };

  const getTotal = (marks: typeof data[0]["marks"], keys: string[]) =>
    keys.reduce((sum, k) => sum + (Number(marks[k as keyof typeof marks]) || 0), 0);

  const totalCO1List = data.map((d) =>
    getTotal(d.marks, ["1a", "1b", "2a", "2b"])
  );
  const totalCO2List = data.map((d) =>
    getTotal(d.marks, ["3a", "3b", "4a", "4b"])
  );

  const avgCO1 = (
    totalCO1List.reduce((a, b) => a + b, 0) / data.length
  ).toFixed(2);
  const avgCO2 = (
    totalCO2List.reduce((a, b) => a + b, 0) / data.length
  ).toFixed(2);

  useEffect(() => {
    setAverages(avgCO1, avgCO2);
  }, [avgCO1, avgCO2, setAverages]);

  return (
    <div className="bg-[#2B1F3A] p-6 rounded-xl border border-[#7E5AC8]">
      <h2 className="text-xl font-bold mb-4">Marks Entry by Sub-Question</h2>
      <div className="overflow-auto">
        <table className="min-w-[1000px] w-full border-collapse text-sm text-white">
          <thead>
            <tr className="bg-orange-700 text-center">
              <th rowSpan={3} className="border p-2">USN</th>
              <th rowSpan={3} className="border p-2">Name</th>
              <th colSpan={4} className="border p-2">C304.2</th>
              <th rowSpan={3} className="border p-2">Total CO1</th>
              <th colSpan={4} className="border p-2">C304.3</th>
              <th rowSpan={3} className="border p-2">Total CO2</th>
            </tr>
            <tr className="bg-orange-600 text-center">
              <th className="border p-2">1a</th>
              <th className="border p-2">1b</th>
              <th className="border p-2">2a</th>
              <th className="border p-2">2b</th>
              <th className="border p-2">3a</th>
              <th className="border p-2">3b</th>
              <th className="border p-2">4a</th>
              <th className="border p-2">4b</th>
            </tr>
            <tr className="bg-orange-500 text-center font-semibold">
              <th className="border p-2">CL3</th>
              <th className="border p-2">CL2</th>
              <th className="border p-2">CL3</th>
              <th className="border p-2">CL2</th>
              <th className="border p-2">CL3</th>
              <th className="border p-2">CL2</th>
              <th className="border p-2">CL3</th>
              <th className="border p-2">CL2</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, i) => {
              const totalCO1 = totalCO1List[i];
              const totalCO2 = totalCO2List[i];
              return (
                <tr key={i} className="text-center border-t">
                  <td className="border p-2">{student.usn}</td>
                  <td className="border p-2">{student.name}</td>
                  {["1a", "1b", "2a", "2b", "3a", "3b", "4a", "4b"].map((k) => (
                    <td key={k} className="border p-1">
                      <input
                        type="number"
                        value={student.marks[k as keyof typeof student["marks"]]}
                        onChange={(e) =>
                          handleChange(i, k as keyof typeof student["marks"], parseFloat(e.target.value))
                        }
                        className="w-14 px-1 py-1 text-black rounded"
                      />
                    </td>
                  ))}
                  <td className="border p-2 font-semibold">{totalCO1}</td>
                  <td className="border p-2 font-semibold">{totalCO2}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-[#1F1B2E] font-semibold text-center">
            <tr>
              <td colSpan={6} className="p-2 border text-right">Average CO1</td>
              <td className="border p-2 text-green-400">{avgCO1}</td>
              <td colSpan={4} className="p-2 border text-right">Average CO2</td>
              <td className="border p-2 text-green-400">{avgCO2}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
