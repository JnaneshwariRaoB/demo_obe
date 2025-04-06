'use client';

import { useState } from 'react';

const students = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
}));

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleChange = (id: number, value: string) => {
    setAttendance((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (!date || !month || !year) {
      alert("Please select a full date before submitting.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120C1C] via-[#1F142B] to-[#0A0710] text-white p-10 font-sans">
      <div className="bg-[#1D1529]/70 border border-[#7E5AC8] rounded-2xl shadow-xl max-w-5xl mx-auto p-8 space-y-6">
        <h1 className="text-3xl font-bold text-[#C5B0F3] border-b border-[#7E5AC8] pb-2">Student Attendance</h1>

        {/* Date Selector */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="flex flex-col">
            <label className="text-[#C5B0F3] mb-1">Day</label>
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-[#2F2541] text-white border border-[#7E5AC8] rounded px-3 py-1"
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[#C5B0F3] mb-1">Month</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-[#2F2541] text-white border border-[#7E5AC8] rounded px-3 py-1"
            >
              <option value="">Month</option>
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December",
              ].map((m, idx) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[#C5B0F3] mb-1">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-[#2F2541] text-white border border-[#7E5AC8] rounded px-3 py-1"
            >
              <option value="">Year</option>
              {["2023", "2024", "2025"].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Attendance Table */}
        <table className="w-full table-auto text-left border-collapse mt-6">
          <thead>
            <tr className="text-[#A786DF] border-b border-[#7E5AC8]">
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-[#2A1C3A] transition">
                <td className="p-2">{student.id}</td>
                <td className="p-2">{student.name}</td>
                <td className="p-2">
                  <select
                    value={attendance[student.id] || ''}
                    onChange={(e) => handleChange(student.id, e.target.value)}
                    className="bg-[#2F2541] text-white border border-[#7E5AC8] rounded px-3 py-1 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleSubmit}
          className="bg-[#6A4C93] hover:bg-[#573b79] transition text-white px-6 py-2 rounded-xl mt-4"
        >
          Submit Attendance
        </button>

        {submitted && (
          <div className="mt-6 bg-[#2A1C3A] p-4 rounded-xl border border-[#7E5AC8]">
            <h2 className="text-xl font-semibold text-[#C5B0F3] mb-2">
              Attendance Summary for {date} {month} {year}
            </h2>
            <ul className="list-disc ml-6 space-y-1 text-[#EADCF9]">
              {students.map((student) => (
                <li key={student.id}>
                  {student.name}: {attendance[student.id] || 'Not Marked'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
