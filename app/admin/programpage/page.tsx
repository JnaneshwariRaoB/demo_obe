'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

type Tab = 'student' | 'faculty' | 'hod'

export default function ProgramDetailPage() {
  const searchParams = useSearchParams()
  const dept = searchParams.get('dept')
  const prog = searchParams.get('prog')

  const [activeTab, setActiveTab] = useState<Tab>('student')
  const [items, setItems] = useState<any[]>([])
  const [isAdding, setIsAdding] = useState(false)

  const [formData, setFormData] = useState<any>({
    name: '',
    usn: '',
    gender: '',
    sslc: '',
    facultyId: '',
    designation: '',
    email: '',
    hodDept: '',
    fromDate: '',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    let entry = {}
    if (activeTab === 'student') {
      const { name, usn, gender, sslc } = formData
      if (!name || !usn) return
      entry = { name, usn, gender, sslc }
    } else if (activeTab === 'faculty') {
      const { name, facultyId, designation, email } = formData
      if (!name || !facultyId) return
      entry = { name, facultyId, designation, email }
    } else if (activeTab === 'hod') {
      const { name, hodDept, email, fromDate } = formData
      if (!name || !hodDept) return
      entry = { name, hodDept, email, fromDate }
    }

    if (isEditing && editIndex !== null) {
      const updatedItems = [...items]
      updatedItems[editIndex] = entry
      setItems(updatedItems)
    } else {
      setItems([...items, entry])
    }

    setIsEditing(false)
    setEditIndex(null)
    setIsAdding(false)

    setFormData({
      name: '',
      usn: '',
      gender: '',
      sslc: '',
      facultyId: '',
      designation: '',
      email: '',
      hodDept: '',
      fromDate: '',
    })
  }

  const handleDelete = (index: number) => {
    const updatedItems = items.filter((_, idx) => idx !== index)
    setItems(updatedItems)
  }

  const renderFormFields = () => {
    switch (activeTab) {
      case 'student':
        return (
          <>
            <input name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Name" className={inputStyle} />
            <input name="usn" value={formData.usn || ''} onChange={handleInputChange} placeholder="USN" className={inputStyle} />
            <input name="gender" value={formData.gender || ''} onChange={handleInputChange} placeholder="Gender" className={inputStyle} />
            <input name="sslc" value={formData.sslc || ''} onChange={handleInputChange} placeholder="SSLC Marks" className={inputStyle} />
          </>
        )
      case 'faculty':
        return (
          <>
            <input name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Name" className={inputStyle} />
            <input name="facultyId" value={formData.facultyId || ''} onChange={handleInputChange} placeholder="Faculty ID" className={inputStyle} />
            <input name="designation" value={formData.designation || ''} onChange={handleInputChange} placeholder="Designation" className={inputStyle} />
            <input name="email" value={formData.email || ''} onChange={handleInputChange} placeholder="Email" className={inputStyle} />
          </>
        )
      case 'hod':
        return (
          <>
            <input name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="HOD Name" className={inputStyle} />
            <input name="hodDept" value={formData.hodDept || ''} onChange={handleInputChange} placeholder="Department" className={inputStyle} />
            <input name="email" value={formData.email || ''} onChange={handleInputChange} placeholder="Email" className={inputStyle} />
            <input name="fromDate" value={formData.fromDate || ''} onChange={handleInputChange} placeholder="From Date" className={inputStyle} />
          </>
        )
    }
  }

  const inputStyle = `p-3 rounded-xl border border-[#9B72CF] bg-[#4A355F] placeholder-[#D8C7EB] text-white font-bold focus:outline-none focus:ring-2 focus:ring-[#9B72CF] shadow-sm`

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#1A1022] to-[#2B1A3D] text-white font-serif">
      {/* Sidebar */}
      <aside className="w-1/4 bg-[#2A1B33] p-6 border-r border-[#9B72CF] shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-[#D8C7EB]">Options</h2>
        <ul className="space-y-3">
          {['student', 'faculty', 'hod'].map((tab) => (
            <li key={tab}>
              <button
                onClick={() => {
                  setActiveTab(tab as Tab)
                  setItems([]) // Clear existing items when tab switches
                  setIsEditing(false)
                  setEditIndex(null)
                  setIsAdding(false)
                }}
                className={`w-full px-4 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === tab ? 'bg-[#6C3CA5] text-white shadow-md' : 'bg-[#3B2B4F] text-[#D8C7EB] hover:bg-[#53316E]'}`}
              >
                {tab === 'hod' ? 'HOD Assign' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2 text-[#EADCF9]">Program: {prog}</h1>
          <p className="text-lg text-[#C7B3DD] font-semibold">Department: {dept}</p>
        </div>

        {/* Button row */}
        <div className="mb-4 space-x-4">
          <button
            onClick={() => {
              if (activeTab === 'hod' && items.length === 1 && !isEditing) return
              setIsAdding(true)
              setIsEditing(false)
              setFormData({
                name: '',
                usn: '',
                gender: '',
                sslc: '',
                facultyId: '',
                designation: '',
                email: '',
                hodDept: '',
                fromDate: '',
              })
            }}
            className="bg-[#6C3CA5] text-white px-4 py-2 rounded-xl hover:bg-[#53316E] font-semibold shadow-md"
          >
            Add
          </button>

          <button
            onClick={() => {
              setIsAdding(false)
              setIsEditing(false)
              setEditIndex(null)
            }}
            className="bg-[#3B2B4F] text-[#D8C7EB] px-4 py-2 rounded-xl hover:bg-[#4A355F] font-semibold shadow"
          >
            View
          </button>
        </div>

        {/* Form Section */}
        {isAdding && !(activeTab === 'hod' && items.length === 1 && !isEditing) && (
          <div className="mb-8">
            <label className="block mb-4 text-lg font-bold text-white">
              {isEditing ? 'Edit' : 'Add'} {activeTab === 'hod' ? 'HOD Assign' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </label>
            <div className="grid grid-cols-2 gap-4 mb-4">{renderFormFields()}</div>
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-[#9B72CF] to-[#6C3CA5] text-white font-bold px-6 py-2 rounded-xl hover:from-[#53316E] hover:to-[#8A5EC2] shadow-lg transition"
            >
              {isEditing ? 'Save Changes' : 'Add'}
            </button>
          </div>
        )}

        {/* View Section */}
        {!isAdding && (
          <div className="bg-[#332244] rounded-2xl p-6 shadow-lg border border-[#9B72CF]">
            <h2 className="text-2xl font-bold text-white mb-4 capitalize">{activeTab} List</h2>
            {items.length === 0 ? (
              <p className="text-[#C7B3DD] font-semibold">No {activeTab}s added yet.</p>
            ) : (
              <ul className="space-y-2">
                {items.map((item, idx) => (
                  <li key={idx} className="bg-[#4A355F] p-3 rounded-lg text-white">
                    {Object.entries(item).map(([key, val]) => (
                      <div key={key}><strong>{key}:</strong> {String(val)}</div>
                    ))}
                    {(activeTab === 'hod' || activeTab === 'faculty') && (
                      <div className="flex space-x-4 mt-2">
                        <button
                          onClick={() => {
                            setFormData(item)
                            setIsEditing(true)
                            setEditIndex(idx)
                            setIsAdding(true)
                          }}
                          className="bg-[#9B72CF] text-white px-4 py-1 rounded-lg hover:bg-[#7a59b3] font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
