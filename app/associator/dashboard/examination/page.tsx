'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

// Sidebar Component
const Sidebar = ({
  setActiveForm,
}: {
  setActiveForm: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  return (
    <aside className="w-64 p-6 bg-[#1C152C] border-r border-[#7E5AC8]">
      <h2 className="text-xl font-bold mb-4 text-white">Navigation</h2>
      <button
        onClick={() => setActiveForm('questionPaper')}
        className="w-full text-left py-2 px-4 mb-2 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition text-white font-bold"
      >
        Question Paper
      </button>
      <button
        onClick={() => setActiveForm('markEntry')}
        className="w-full text-left py-2 px-4 mb-2 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition text-white font-bold"
      >
        Mark Entry
      </button>
      <button
        onClick={() => setActiveForm('resultAnalysis')}
        className="w-full text-left py-2 px-4 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition text-white font-bold"
      >
        Result Analysis
      </button>
    </aside>
  )
}

// Question Paper Form
const QuestionPaperForm = () => {
  const selectedQP = {
    module: 'Module 3',
    totalMarks: 100,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRJsAMlHa9Hn-ECUUqtT8sieMbT0myYJfseA&s',
  }

  return (
    <div className="p-6 text-white font-bold">
      <h2 className="text-xl mb-4">Question Paper Setup (View Only)</h2>

      <div className="mb-4">
        <label className="block mb-1">Selected Module:</label>
        <span className="bg-[#2F2541] px-3 py-2 rounded inline-block">
          {selectedQP.module}
        </span>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Total Marks:</label>
        <span className="bg-[#2F2541] px-3 py-2 rounded inline-block">
          {selectedQP.totalMarks}
        </span>
      </div>

      <div className="mt-6">
        <h3 className="text-lg mb-2">Question Paper Preview:</h3>
        <img
          src={selectedQP.image}
          alt="Question Paper Preview"
          className="w-full max-w-md rounded-lg border border-gray-400"
        />
      </div>
    </div>
  )
}

// Mark Entry Form
const MarkEntryForm = () => (
  <div className="p-6 text-white font-bold">
    <h2 className="text-xl mb-4">Mark Entry (View Only)</h2>
    <ul className="space-y-2">
      <li className="bg-[#2F2541] p-3 rounded">Student A: 78</li>
      <li className="bg-[#2F2541] p-3 rounded">Student B: 85</li>
      <li className="bg-[#2F2541] p-3 rounded">Student C: 92</li>
    </ul>
  </div>
)

// Result Analysis Form
const ResultAnalysisForm = () => (
  <div className="p-6 text-white font-bold">
    <h2 className="text-xl mb-4">Result Analysis (View Only)</h2>
    <p className="bg-[#2F2541] p-4 rounded leading-relaxed">
      Average Score: 85 <br />
      Highest Score: 92 <br />
      Lowest Score: 65 <br />
      Remarks: Most students performed well, but improvement is needed in Module 2.
    </p>
  </div>
)

// Main Component
export default function CourseResPage() {
  const [activeForm, setActiveForm] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const courseName = searchParams.get('name') || 'Unknown Course'

  const renderForm = () => {
    switch (activeForm) {
      case 'questionPaper':
        return <QuestionPaperForm />
      case 'markEntry':
        return <MarkEntryForm />
      case 'resultAnalysis':
        return <ResultAnalysisForm />
      default:
        return (
          <p className="text-white font-bold p-6">
            Please select an option from the sidebar.
          </p>
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-[#1A132B] font-sans">
      <Sidebar setActiveForm={setActiveForm} />
      <main className="flex-1 p-6 text-white font-bold">
        <h1 className="text-2xl mb-6">Course: {courseName}</h1>
        {renderForm()}
      </main>
    </div>
  )
}
