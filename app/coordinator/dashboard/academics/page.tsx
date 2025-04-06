'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const academicYears = ['2019-20', '2020-21', '2021-22', '2022-23']
const semesters = ['Odd', 'Even']

const courseData: {
  [year: string]: {
    [semester: string]: {
      code: string
      name: string
      credits: number
      type: string
      description: string
    }[]
  }
} = {
  '2019-20': {
    Odd: [
      { code: 'MA101', name: 'Calculus I', credits: 4, type: 'Theory', description: 'Intro to differential and integral calculus.' },
      { code: 'CS101', name: 'Programming Basics', credits: 3, type: 'Theory', description: 'C programming, problem-solving, and logic building.' },
    ],
    Even: [
      { code: 'PH102', name: 'Physics-II', credits: 3, type: 'Theory', description: 'Electromagnetism and optics.' },
    ],
  },
  '2020-21': {
    Odd: [
      { code: 'MA201', name: 'Linear Algebra', credits: 4, type: 'Theory', description: 'Matrices, vector spaces, and eigenvalues.' },
    ],
    Even: [
      { code: 'CS205', name: 'Data Structures', credits: 3, type: 'Theory', description: 'Trees, graphs, queues, and stacks.' },
    ],
  },
  '2021-22': {
    Odd: [
      { code: 'EE301', name: 'Electrical Circuits', credits: 4, type: 'Theory', description: 'Ohm’s law, KVL, KCL, and circuit analysis.' },
    ],
    Even: [
      { code: 'MA302', name: 'Probability & Stats', credits: 3, type: 'Theory', description: 'Random variables, distributions, and estimation.' },
    ],
  },
  '2022-23': {
    Odd: [
      { code: 'CS301', name: 'Algorithms', credits: 3, type: 'Theory', description: 'Searching, sorting, recursion, and complexity.' },
    ],
    Even: [
      { code: 'HS102', name: 'Communication Skills', credits: 2, type: 'Theory', description: 'Effective writing and speaking in academic contexts.' },
    ],
  },
}

export default function AcademicsPage() {
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const router = useRouter()

  const courseList =
    selectedYear && selectedSemester
      ? courseData[selectedYear]?.[selectedSemester] || []
      : []

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course)
  }

  const handleNavigation = (type: 'existing' | 'new') => {
    if (!selectedCourse) return
    const route = type === 'existing'
      ? `/coordinator/dashboard/academics/course?name=${encodeURIComponent(selectedCourse.name)}`
      : `/coordinator/dashboard/academics/Newcourse?name=${encodeURIComponent(selectedCourse.name)}`
    router.push(route)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0B1F] via-[#1A132B] to-[#110A1C] text-white p-8 font-serif">
      <h1 className="text-4xl font-bold text-[#EADCF9] mb-8">Academics</h1>

      {/* Year & Semester Selection */}
      <div className="space-y-8 max-w-4xl mb-10">
        {/* Academic Year */}
        <div>
          <h2 className="text-lg mb-3 text-[#D8C7EB] font-semibold">Choose Academic Year:</h2>
          <div className="flex flex-wrap gap-4">
            {academicYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-5 py-2 rounded-xl border font-medium transition duration-300 ${
                  selectedYear === year
                    ? 'bg-[#6D4CAF] text-white border-[#9B72CF]'
                    : 'bg-[#2B1F3A] text-[#BBAAD3] border-[#4D3A74] hover:bg-[#4D3A74]'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Semester */}
        <div>
          <h2 className="text-lg mb-3 text-[#D8C7EB] font-semibold">Choose Semester:</h2>
          <div className="flex gap-6">
            {semesters.map((sem) => (
              <button
                key={sem}
                onClick={() => setSelectedSemester(sem)}
                className={`px-6 py-2 rounded-xl border font-medium transition duration-300 ${
                  selectedSemester === sem
                    ? 'bg-[#6D4CAF] text-white border-[#9B72CF]'
                    : 'bg-[#2B1F3A] text-[#BBAAD3] border-[#4D3A74] hover:bg-[#4D3A74]'
                }`}
              >
                {sem}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Display Courses */}
      {selectedYear && selectedSemester ? (
        courseList.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-[#BBAAD3] mb-4">Theory Courses Allocated</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {courseList.map((course) => (
                <div
                  key={course.code}
                  onClick={() => handleCourseClick(course)}
                  className="cursor-pointer bg-[#2B1F3A] p-6 rounded-xl border border-[#7E5AC8] hover:shadow-xl transition duration-300"
                >
                  <h3 className="text-xl font-bold text-[#EADCF9] mb-2">{course.name}</h3>
                  <p className="text-[#BBAAD3]">Code: <span className="text-white">{course.code}</span></p>
                  <p className="text-[#BBAAD3]">Credits: <span className="text-white">{course.credits}</span></p>
                  <p className="text-[#BBAAD3]">Type: <span className="text-white">{course.type}</span></p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-[#9B84D1] text-lg mt-6">No courses available for this combination.</p>
        )
      ) : (
        <p className="mt-8 text-[#9B84D1] text-lg">Please select both Academic Year and Semester to view courses.</p>
      )}

      {/* Course Type Selection Popup */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#1A132B] border border-[#9B72CF] rounded-xl p-6 space-y-4 max-w-md w-full">
            <h3 className="text-xl font-bold text-[#EADCF9]">
              {selectedCourse.name}
            </h3>
            <p className="text-[#BBAAD3]">Choose course type:</p>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => handleNavigation('existing')}
                className="flex-1 bg-[#6D4CAF] text-white py-2 rounded hover:bg-opacity-90"
              >
                Existing Course
              </button>
              <button
                onClick={() => handleNavigation('new')}
                className="flex-1 bg-[#A786DF] text-white py-2 rounded hover:bg-opacity-90"
              >
                New Course
              </button>
            </div>
            <button
              onClick={() => setSelectedCourse(null)}
              className="text-sm text-red-400 underline hover:text-red-300 mt-2 block text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
