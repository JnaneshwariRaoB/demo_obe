'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

const sections = [
  'Academics',
  'Research',
  'Attendance',
  'Mentor-Mentee',
  'Examination',
  'Feedback',
] as const
type Section = typeof sections[number]

const sectionRoutes: Record<Section, string> = {
  'Academics': '/coordinator/dashboard/academics',
  'Research': '/coordinator/dashboard/research',
  'Attendance': '/coordinator/dashboard/attendance',
  'Mentor-Mentee': '/coordinator/dashboard/mentor-mentee',
  'Examination': '/exam',
  'Feedback': '/coordinator/dashboard/feedback',
}

export default function DashboardPage() {
  const router = useRouter()

  const handleNavigate = useCallback((section: Section) => {
    const path = sectionRoutes[section]
    router.push(path)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0B1F] via-[#1A132B] to-[#110A1C] text-white font-serif flex flex-col items-center justify-center p-8">
      <div className="text-center mb-30 bg-[#3F3147] p-4 rounded-xl shadow-md border border-[#9C88B8]">
  <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm">
    Sahyadri College of Engineering and Management
  </h3>
  <h4 className="text-lg md:text-xl font-medium text-[#A786DF] mt-1">
    Department of Information Science & Engineering
  </h4>
</div>


      <h1 className="text-5xl font-extrabold text-[#EADCF9] mb-12 tracking-wider">Dashboard</h1>

      {/* Dashboard Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => handleNavigate(section)}
            className={`w-full px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 tracking-wide bg-[#2B1F3A] text-[#BBAAD3] hover:bg-[#4D3A74] hover:scale-[1.02]`}
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  )
}
