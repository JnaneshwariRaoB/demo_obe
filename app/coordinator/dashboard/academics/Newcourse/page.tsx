'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'

const courseData = [
  // ... same data, untouched
  {
    name: 'Calculus I',
    code: 'MA101',
    credits: 4,
    type: 'Theory',
    description: 'Intro to differential and integral calculus.',
    nbaCode: 'MA-NBA-09',
    class: 'III Year - CSE A',
  },
  {
    name: 'Programming Basics',
    code: 'CS101',
    credits: 3,
    type: 'Theory',
    description: 'C programming, problem-solving, and logic building.',
    nbaCode: 'MA-NBA-09',
    class: 'III Year - CSE A',
  },
  {
    name: 'Physics-II',
    code: 'PH102',
    credits: 3,
    type: 'Theory',
    description: 'Electromagnetism and optics.',
    nbaCode: 'MA-NBA-09',
    class: 'III Year - CSE A',
  },
  {
    name: 'Linear Algebra',
    code: 'MA201',
    credits: 4,
    type: 'Theory',
    description: 'Matrices, vector spaces, and eigenvalues.',
    nbaCode: 'MA-NBA-09',
    class: 'III Year - CSE A',
  },
  {
    name: 'Data Structures',
    code: 'CS205',
    credits: 3,
    type: 'Theory',
    description: 'Trees, graphs, queues, and stacks.',
    nbaCode: 'MA-NBA-09',
    class: 'III Year - CSE A',
  },
  {
    name: 'Electrical Circuits',
    code: 'EE301',
    credits: 4,
    type: 'Theory',
    description: 'Ohm’s law, KVL, KCL, and circuit analysis.',
    nbaCode: 'MA-NBA-09',
    class: 'III Year - CSE A',
  },
  {
    name: 'Probability & Stats',
    code: 'MA302',
    credits: 3,
    type: 'Theory',
    description: 'Random variables, distributions, and estimation.',
    nbaCode: 'MA-NBA-09',
    class: 'III Year - CSE A',
  },
  {
    name: 'Algorithms',
    code: 'CS301',
    credits: 3,
    type: 'Theory',
    description: 'Searching, sorting, recursion, and complexity.',
    nbaCode: 'MA-NBA-09',
    class: 'III Year - CSE A',
  },
  {
    name: 'Communication Skills',
    code: 'HS102',
    credits: 2,
    type: 'Theory',
    description: 'Effective writing and speaking in academic contexts.',
    nbaCode: 'MA-NBA-09',
    class: 'III Year - CSE A',
  },
]

export default function CoursePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseName = searchParams.get('name')
  const course = courseData.find((c) => c.name === courseName)

  const [view, setView] = useState<'course' | 'vision'>('course')

  const redirectTo = (path: string) => {
    if (courseName) {
      router.push(`/courseFile/${path}?name=${encodeURIComponent(courseName)}`)
    }
  }

  return (
    <div className="flex min-h-screen font-serif bg-gradient-to-br from-[#0D0B1F] via-[#1A132B] to-[#110A1C] text-white">
      
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-[#1C152C] border-r border-[#7E5AC8]">
        <h2 className="text-xl font-bold mb-4 text-[#EADCF9]">Navigation</h2>
        <button
          onClick={() => setView('course')}
          className={`w-full text-left py-2 px-4 mb-2 rounded-lg ${
            view === 'course' ? 'bg-[#7E5AC8]' : 'bg-[#322348]'
          } hover:bg-[#7E5AC8] transition`}
        >
          Course
        </button>
        <button
          onClick={() => setView('vision')}
          className={`w-full text-left py-2 px-4 mb-4 rounded-lg ${
            view === 'vision' ? 'bg-[#7E5AC8]' : 'bg-[#322348]'
          } hover:bg-[#7E5AC8] transition`}
        >
          Vision & Mission
        </button>

        {/* Additional buttons that redirect */}
        <button onClick={() => redirectTo('cos')} className="w-full text-left py-2 px-4 mb-2 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition">List of COs</button>
        <button onClick={() => redirectTo('gap')} className="w-full text-left py-2 px-4 mb-2 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition">Curriculum Gap</button>
        <button onClick={() => redirectTo('beyond')} className="w-full text-left py-2 px-4 mb-2 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition">Content Beyond Syllabus</button>
        <button onClick={() => redirectTo('action')} className="w-full text-left py-2 px-4 mb-2 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition">Action</button>
        <button onClick={() => redirectTo('mapping')} className="w-full text-left py-2 px-4 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition">CO-PO Mapping</button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {view === 'course' ? (
          course ? (
            <div>
              <h1 className="text-4xl font-bold text-[#EADCF9] mb-6">Course: {course.name}</h1>
              <div className="bg-[#2B1F3A] p-6 rounded-2xl border border-[#7E5AC8] shadow-lg max-w-3xl">
                <p className="mb-2 text-lg text-[#C8B5E9]">
                  <span className="font-semibold text-white">Code:</span> {course.code}
                </p>
                <p className="mb-2 text-lg text-[#C8B5E9]">
                  <span className="font-semibold text-white">Credits:</span> {course.credits}
                </p>
                <p className="mb-2 text-lg text-[#C8B5E9]">
                  <span className="font-semibold text-white">Type:</span> {course.type}
                </p>
                <p className="mt-4 text-md text-[#D2C3ED] leading-relaxed">
                  <span className="font-semibold text-white">Description:</span> {course.description}
                </p>
                {course.nbaCode && (
                  <p className="mb-2 text-lg text-[#C8B5E9]">
                    <span className="font-semibold text-white">NBA Code:</span> {course.nbaCode}
                  </p>
                )}
                {course.class && (
                  <p className="mb-2 text-lg text-[#C8B5E9]">
                    <span className="font-semibold text-white">Class:</span> {course.class}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold">Course not found</h1>
              <p className="text-[#BBBBBB] mt-2">The course you're looking for doesn't exist or wasn't passed correctly.</p>
            </div>
          )
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-[#EADCF9] mb-6">Department & Institution Overview</h1>
            <div className="bg-[#2B1F3A] p-6 rounded-2xl border border-[#7E5AC8] shadow-lg max-w-4xl space-y-6">
              {/* Vision, Mission, PEO, PO, PSO sections */}
              {/* ... Unchanged */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-2">Vision</h2>
                <p className="text-[#D2C3ED]">To be a center of excellence in technical education and research, nurturing professionals who contribute to the development of society.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-2">Mission</h2>
                <p className="text-[#D2C3ED]">To impart quality education and foster innovation through dedicated teaching and collaborative learning, enabling students to achieve professional competence and ethical values.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-2">Program Educational Objectives (PEO)</h2>
                <ul className="list-disc list-inside text-[#D2C3ED] space-y-1">
                  <li>PEO1: Graduates will succeed in professional careers or higher education by acquiring knowledge in engineering and allied disciplines.</li>
                  <li>PEO2: Graduates will demonstrate lifelong learning and adapt to evolving technologies.</li>
                  <li>PEO3: Graduates will contribute ethically and responsibly to society through engineering solutions.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-2">Program Outcomes (PO)</h2>
                <ul className="list-decimal list-inside text-[#D2C3ED] space-y-1">
                  <li>Engineering knowledge</li>
                  <li>Problem analysis</li>
                  <li>Design/development of solutions</li>
                  <li>Conduct investigations of complex problems</li>
                  <li>Modern tool usage</li>
                  <li>The engineer and society</li>
                  <li>Environment and sustainability</li>
                  <li>Ethics</li>
                  <li>Individual and team work</li>
                  <li>Communication</li>
                  <li>Project management and finance</li>
                  <li>Life-long learning</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-2">Program Specific Outcomes (PSO)</h2>
                <ul className="list-disc list-inside text-[#D2C3ED] space-y-1">
                  <li>PSO1: Apply domain-specific knowledge to solve real-world engineering problems.</li>
                  <li>PSO2: Demonstrate proficiency in modern tools and technologies relevant to the discipline.</li>
                </ul>
              </section>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
