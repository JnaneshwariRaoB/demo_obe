'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const sections = ['Role', 'Profile', 'Leave Module', 'Personal Reports', 'Notifications'] as const
type Section = typeof sections[number]

const roles = ['HOD', 'Course Coordinator', 'Course Associate'] as const
type RoleOption = typeof roles[number]

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<Section>('Role')
  const [selectedRole, setSelectedRole] = useState<RoleOption | ''>('')
  const router = useRouter()

  useEffect(() => {
    if (selectedRole === 'HOD') {
      router.push('/hod/dashboard')
    } else if (selectedRole === 'Course Coordinator') {
      router.push('/coordinator/dashboard')
    } else if (selectedRole === 'Course Associate') {
      router.push('/associator/dashboard')
    }
  }, [selectedRole, router])

  const renderSection = () => {
    switch (activeSection) {
      case 'Role':
        return (
          <div className="text-lg font-semibold text-[#EADCF9] space-y-4">
            <label htmlFor="roleSelect" className="block text-xl mb-2">
              Select your role:
            </label>
            <select
              id="roleSelect"
              className="w-full bg-[#2B1F3A] text-white p-3 rounded-xl border border-[#7E5AC8] focus:outline-none focus:ring-2 focus:ring-[#9B72CF]"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as RoleOption)}
            >
              <option value="" disabled>
                -- Choose Role --
              </option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            {selectedRole && !['HOD', 'Course Coordinator', 'Course Associate'].includes(selectedRole) && (
              <div className="mt-4 text-[#BBAAD3]">
                You selected: <span className="font-bold text-white">{selectedRole}</span>
              </div>
            )}
          </div>
        )
      case 'Profile':
        return <div className="text-lg font-semibold text-[#EADCF9]">Your profile information goes here...</div>
      case 'Leave Module':
        return <div className="text-lg font-semibold text-[#EADCF9]">Apply/View Leaves here...</div>
      case 'Personal Reports':
        return <div className="text-lg font-semibold text-[#EADCF9]">Personal performance reports go here...</div>
      case 'Notifications':
        return <div className="text-lg font-semibold text-[#EADCF9]">System and Admin notifications go here...</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0B1F] via-[#1A132B] to-[#110A1C] text-white font-serif flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-extrabold text-[#EADCF9] mb-12 tracking-wider">Dashboard</h1>

      {/* Dashboard Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-12">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`w-full px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 tracking-wide ${
              activeSection === section
                ? 'bg-[#6D4CAF] text-white shadow-xl scale-105'
                : 'bg-[#2B1F3A] text-[#BBAAD3] hover:bg-[#4D3A74] hover:scale-[1.02]'
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Active Section Display */}
      <div className="bg-[#261C38] w-full max-w-4xl rounded-2xl p-8 shadow-2xl border border-[#7E5AC8]">
        <h2 className="text-3xl font-bold text-[#D8C7EB] mb-4">{activeSection}</h2>
        {renderSection()}
      </div>
    </div>
  )
}
