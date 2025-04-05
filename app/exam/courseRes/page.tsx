'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

// Sidebar Component
const Sidebar = ({ setActiveForm }: { setActiveForm: React.Dispatch<React.SetStateAction<string | null>> }) => {
  return (
    <aside className="w-64 p-6 bg-[#1C152C] border-r border-[#7E5AC8]">
      <h2 className="text-xl font-bold mb-4 text-[#EADCF9]">Navigation</h2>
      <button
        onClick={() => setActiveForm('questionPaper')}
        className="w-full text-left py-2 px-4 mb-2 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition"
      >
        Question Paper
      </button>
      <button
        onClick={() => setActiveForm('markEntry')}
        className="w-full text-left py-2 px-4 mb-2 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition"
      >
        Mark Entry
      </button>
      <button
        onClick={() => setActiveForm('resultAnalysis')}
        className="w-full text-left py-2 px-4 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition"
      >
        Result Analysis
      </button>
    </aside>
  )
}

// Question Paper Form
const QuestionPaperForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Question Paper Setup</h2>

      <label className="block mb-2">Select Module</label>
      <select className="w-full mb-4 p-2 rounded-md text-black">
        <option value="">-- Select Module --</option>
        {[1,1.5, 2,2.5 , 3,3.5, 4,4.5 , 5].map(num => (
          <option key={num} value={`Module ${num}`}>{`Module ${num}`}</option>
        ))}
      </select>

      <label className="block mb-2">Total Marks</label>
      <input
        type="number"
        className="w-full mb-4 p-2 rounded-md text-black"
        placeholder="Enter total marks"
      />

      

      <label className="block mb-2">Upload File (Question Paper / Scheme)</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full mb-4 p-2 rounded-md text-white"
      />

      {previewUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Preview:</h3>
          <img
            src={previewUrl}
            alt="Uploaded Preview"
            className="w-full max-w-md rounded-lg border border-gray-400"
          />
        </div>
      )}
    </div>
  )
}

// Mark Entry Form
const MarkEntryForm = () => (
  <div className="p-6 text-white">
    <h2 className="text-xl font-bold mb-4">Mark Entry</h2>
    <label className="block mb-2">Enter marks</label>
    <input className="w-full p-2 rounded-md text-black" type="text" />
  </div>
)

// Result Analysis Form
const ResultAnalysisForm = () => (
  <div className="p-6 text-white">
    <h2 className="text-xl font-bold mb-4">Result Analysis</h2>
    <label className="block mb-2">Upload/Describe Analysis</label>
    <textarea className="w-full p-2 rounded-md text-black" rows={4} />
  </div>
)

// Main Page Component
export default function CourseResPage() {
  const [activeForm, setActiveForm] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const courseName = searchParams.get("name") || "Unknown Course"

  const renderForm = () => {
    switch (activeForm) {
      case 'questionPaper':
        return <QuestionPaperForm />
      case 'markEntry':
        return <MarkEntryForm />
      case 'resultAnalysis':
        return <ResultAnalysisForm />
      default:
        return <p className="text-white p-6">Please select an option from the sidebar.</p>
    }
  }

  return (
    <div className="flex min-h-screen bg-[#1A132B] font-sans">
      <Sidebar setActiveForm={setActiveForm} />
      <main className="flex-1 p-6 text-white">
        <h1 className="text-2xl font-bold mb-6">Course: {courseName}</h1>
        {renderForm()}
      </main>
    </div>
  )
}
