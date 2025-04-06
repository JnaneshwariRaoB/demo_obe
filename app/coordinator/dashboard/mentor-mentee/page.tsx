'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

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

const emptyGraphData = Array.from({ length: 12 }, (_, i) => ({
  name: `PO${i + 1}`,
  Attained: 0,
  Target: 0,
}));

export default function MentorMenteePage() {
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<{ name: string; usn: string } | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [graphData, setGraphData] = useState(emptyGraphData);

  const handleBatchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBatch(e.target.value);
    setSelectedStudent(null);
    setSelectedSemester('');
    setGraphData(emptyGraphData);
  };

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const semester = e.target.value;
    setSelectedSemester(semester);

    // Load dummy data
    const newData = Array.from({ length: 12 }, (_, i) => ({
      name: `PO${i + 1}`,
      Attained: Math.floor(Math.random() * 100),
      Target: Math.floor(40 + Math.random() * 40),
    }));

    setGraphData(newData);
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

        {selectedBatch && !selectedStudent && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-[#DCCEFF]">
              Students in Batch {selectedBatch}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {students.map((student, idx) => (
                <div
                  key={idx}
                  className="bg-[#2A1C4A] p-6 rounded-2xl shadow-md border border-[#A275FF] text-center cursor-pointer hover:bg-[#3B2962]"
                  onClick={() => setSelectedStudent(student)}
                >
                  <h3 className="text-xl font-bold text-[#F0E5FF]">{student.name}</h3>
                  <p className="text-[#CDBFF5]">{student.usn}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedStudent && (
          <>
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4 text-[#DCCEFF] text-center">
                Select Semester for {selectedStudent.name}
              </h2>
              <div className="flex justify-center">
                <select
                  onChange={handleSemesterChange}
                  value={selectedSemester}
                  className="w-full max-w-sm p-3 rounded-xl bg-[#2A1C4A] border border-[#A275FF] text-[#EADCF9]"
                >
                  <option value="">-- Select Semester --</option>
                  {[3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem.toString()}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-6 text-center text-[#EADCF9]">
                PO Attainment vs Target for {selectedStudent.name}
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={graphData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#3C2E57" />
                  <XAxis dataKey="name" stroke="#D9C7FF" />
                  <YAxis stroke="#D9C7FF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1D1529', borderColor: '#7E5AC8' }} />
                  <Legend />
                  <Bar dataKey="Attained" fill="#7E5AC8" />
                  <Bar dataKey="Target" fill="#F9A826" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
