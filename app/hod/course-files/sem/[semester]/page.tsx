'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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

const semesterSubjects: Record<string, string[]> = {
  "3": [
    "Logic Design & Embedded System",
    "Object Oriented Programming",
    "Data Structures",
    "Python",
  ],
  "4": [
    "Web Technology",
    "Operating System",
    "Design Algorithm Analysis",
    "Computer Organization",
  ],
  "5": [
    "Data Science",
    "Data Communication",
    "Automata Theory",
    "Database Management",
  ],
  "6": [
    "Software Engineering",
    "Big Data Analytics",
    "AIML",
    "Cryptography",
  ],
  "7": ["Software Testing"],
  "8": ["Project Work", "Internship", "Seminar"]
};

const assessments = [
  { key: 'cie1', label: 'CIE 1', outOf: 30 },
  { key: 'cie2', label: 'CIE 2', outOf: 30 },
  { key: 'cie3', label: 'CIE 3', outOf: 30 },
  { key: 'see', label: 'SEE', outOf: 100 },
] as const;

type AssessmentKey = typeof assessments[number]['key'];

interface Student {
  id: number;
  name: string;
  marks: {
    cie1: number;
    cie2: number;
    cie3: number;
    see: number;
  };
}

export default function SemesterPage() {
  const params = useParams();
  const semester = params.semester as string;
  const subjects = semesterSubjects[semester] || [];

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<AssessmentKey>('cie1');
  const [showMatrix, setShowMatrix] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [targetedValues, setTargetedValues] = useState<number[]>([]);

  const currentAssessment = assessments.find(a => a.key === activeAssessment)!;

  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      marks: {
        cie1: Math.floor(Math.random() * 31),
        cie2: Math.floor(Math.random() * 31),
        cie3: Math.floor(Math.random() * 31),
        see: Math.floor(Math.random() * 101),
      },
    }));
    setStudents(generated);

    const genMatrix = Array.from({ length: 3 }, () =>
      Array.from({ length: 12 }, () => Math.floor(Math.random() * 3))
    );
    setMatrix(genMatrix);

    const targets = Array.from({ length: 12 }, () => Math.floor(40 + Math.random() * 40));
    setTargetedValues(targets);
  }, []);

  const handleMatrixView = (key: AssessmentKey) => {
    setActiveAssessment(key);
    setShowMatrix(true);
  };

  const calculateAttainedValues = () => {
    const poSums = Array(12).fill(0);
    matrix.forEach(row => {
      row.forEach((val, index) => {
        poSums[index] += val;
      });
    });

    return poSums.map(sum => Math.round((sum / matrix.length) * 33.33));
  };

  const attainedValues = calculateAttainedValues();

  if (selectedSubject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#120C1C] via-[#1F142B] to-[#0A0710] text-white font-serif p-10 flex gap-10">
        <div className="w-1/4 bg-[#1D1529]/70 border border-[#7E5AC8] rounded-2xl p-6 space-y-6 shadow-lg">
          <h2 className="text-2xl font-bold text-center text-[#EADCF9] mb-4">Assessments</h2>
          {assessments.map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <button
                className={`w-full py-3 px-4 rounded-xl font-semibold text-left transition-all duration-300 ${
                  activeAssessment === key && !showMatrix
                    ? 'bg-[#6A4C93] text-white shadow-lg'
                    : 'bg-[#2B1F3A] text-[#BBAAD3] hover:bg-[#4D3A74]'
                }`}
                onClick={() => {
                  setActiveAssessment(key);
                  setShowMatrix(false);
                }}
              >
                {label}
              </button>
              <button
                onClick={() => handleMatrixView(key)}
                className="text-sm w-full bg-[#403258] hover:bg-[#584073] text-[#EADCF9] rounded-lg px-3 py-2 transition"
              >
                View Matrix
              </button>
            </div>
          ))}
          <button
            className="mt-6 w-full py-2 px-4 rounded-xl bg-[#3D2A59] hover:bg-[#543B78] text-[#EADCF9] font-medium"
            onClick={() => setSelectedSubject(null)}
          >
            ← Back to Subjects
          </button>
        </div>

        <div className="flex-1 bg-[#1D1529]/70 border border-[#7E5AC8] rounded-2xl p-6 shadow-xl overflow-x-auto">
          <h2 className="text-3xl font-bold text-center text-[#EADCF9] mb-2">
            {showMatrix
              ? `${currentAssessment.label} Matrix`
              : `${currentAssessment.label} Marks (out of ${currentAssessment.outOf})`}
          </h2>
          <h3 className="text-xl font-semibold text-center text-[#C5B0F3] mb-6">
            Subject: {selectedSubject}
          </h3>

          {!showMatrix ? (
            <table className="w-full text-left border border-[#9B72CF] rounded-lg overflow-hidden">
              <thead className="bg-[#2B1F3A] text-white">
                <tr>
                  <th className="py-3 px-4 border border-[#7E5AC8]">ID</th>
                  <th className="py-3 px-4 border border-[#7E5AC8]">Name</th>
                  <th className="py-3 px-4 border border-[#7E5AC8]">Marks</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="bg-[#1B1326] text-white">
                    <td className="py-3 px-4 border border-[#7E5AC8]">{student.id}</td>
                    <td className="py-3 px-4 border border-[#7E5AC8]">{student.name}</td>
                    <td className="py-3 px-4 border border-[#7E5AC8]">{student.marks[activeAssessment]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <div className="overflow-x-auto mb-10">
                <table className="w-full text-left border border-[#9B72CF] rounded-lg overflow-hidden">
                  <thead className="bg-[#2B1F3A] text-white">
                    <tr>
                      <th className="py-3 px-4 border border-[#7E5AC8]">CO</th>
                      {[...Array(12)].map((_, i) => (
                        <th key={i} className="py-3 px-4 border border-[#7E5AC8] text-center">
                          PO{i + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matrix.map((row, rowIndex) => (
                      <tr key={rowIndex} className="bg-[#1B1326] text-white">
                        <td className="py-3 px-4 border border-[#7E5AC8]">CO{rowIndex + 1}</td>
                        {row.map((value, colIndex) => (
                          <td
                            key={colIndex}
                            className="py-3 px-4 border border-[#7E5AC8] text-center"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-10">
                <h4 className="text-xl font-bold text-[#C5B0F3] mb-4 text-center">
                  PO Attainment vs Target
                </h4>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={attainedValues.map((val, i) => ({
                      name: `PO${i + 1}`,
                      Attained: val,
                      Target: targetedValues[i],
                    }))}
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#120619] p-10 font-serif text-[#E3D2FF]">
      <div className="w-full max-w-3xl bg-[#1C0E2D] p-10 rounded-3xl shadow-2xl border border-[#A275FF]">
        <h2 className="text-4xl font-extrabold text-center mb-8">
          Semester {semester} Subjects
        </h2>

        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {subjects.map((subject, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSubject(subject)}
                className="bg-[#2A1046] text-[#E3D2FF] border border-[#A275FF] py-3 px-4 rounded-xl hover:bg-[#3B1C63] transition duration-300 shadow-md"
              >
                {subject}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg mt-6">No subjects available.</p>
        )}
      </div>
    </div>
  );
}
