'use client';

import { useState } from 'react';

const studentsByBatch: Record<string, { name: string; usn: string }[]> = {
  "2020": [
    { name: "Alice Smith", usn: "1RV20CS001" },
    { name: "Bob Johnson", usn: "1RV20CS002" },
    { name: "Carol Davis", usn: "1RV20CS003" },
  ],
  "2021": [
    { name: "Clara White", usn: "1RV21CS001" },
    { name: "David Brown", usn: "1RV21CS002" },
    { name: "Eva Stone", usn: "1RV21CS003" },
  ],
  "2022": [
    { name: "Emily Green", usn: "1RV22CS001" },
    { name: "Frank Black", usn: "1RV22CS002" },
    { name: "Grace Lee", usn: "1RV22CS003" },
  ],
  "2023": [
    { name: "Henry King", usn: "1RV23CS001" },
    { name: "Ivy Moore", usn: "1RV23CS002" },
    { name: "Jack Hall", usn: "1RV23CS003" },
  ],
  "2024": [
    { name: "Karen Young", usn: "1RV24CS001" },
    { name: "Leo Scott", usn: "1RV24CS002" },
    { name: "Mia Clark", usn: "1RV24CS003" },
  ],
};

export default function MentorMenteePage() {
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  const handleBatchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBatch(event.target.value);
  };

  const students = selectedBatch ? studentsByBatch[selectedBatch] || [] : [];

  return (
    <div className="min-h-screen bg-[#10091a] text-white p-10 font-serif">
      <div className="max-w-5xl mx-auto bg-[#1A1030] p-8 rounded-3xl shadow-2xl border border-[#9D6BFF]">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#EADCF9]">Mentor-Mentee Dashboard</h1>

        <div className="mb-10">
          <label className="block mb-3 text-lg text-[#CDBFF5] font-medium">Select Batch:</label>
          <select
            onChange={handleBatchChange}
            className="w-full p-3 rounded-xl bg-[#2A1C4A] border border-[#A275FF] text-[#EADCF9]"
          >
            <option value="">-- Select Batch --</option>
            {Object.keys(studentsByBatch).map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>

        {selectedBatch && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-[#DCCEFF]">
              Students in Batch {selectedBatch}
            </h2>
            {students.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {students.map((student, idx) => (
                  <div
                    key={idx}
                    className="bg-[#2A1C4A] p-6 rounded-2xl shadow-md border border-[#A275FF] text-center"
                  >
                    <h3 className="text-xl font-bold text-[#F0E5FF]">{student.name}</h3>
                    <p className="text-[#CDBFF5]">{student.usn}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-[#CDBFF5]">No students found for this batch.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
