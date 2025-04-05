'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

const sections = [
  'Academics',
  'Research',
  'Administration',
  'Attendance',
  'Mentor-Mentee',
  'Examination',
  'Feedback',
] as const
type Section = typeof sections[number]

const sectionRoutes: Record<Section, string> = {
  'Academics': '/associator/dashboard/academics',
  'Research': '/associator/dashboard/research',
  'Administration': '/associator/dashboard/administration',
  'Attendance': '/associator/dashboard/attendance',
  'Mentor-Mentee': '/associator/dashboard/mentor-mentee',
  'Examination': '/associator/dashboard/examination',
  'Feedback': '/associator/dashboard/feedback',
}

export default function DashboardPage() {
  const router = useRouter()

  const handleNavigate = useCallback((section: Section) => {
    const path = sectionRoutes[section]
    router.push(path)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0B1F] via-[#1A132B] to-[#110A1C] text-white font-serif flex flex-col items-center justify-center p-8">
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
