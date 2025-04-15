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
  const [cie, setCie] = useState<string>("CIE1")
  const [numModules, setNumModules] = useState<number>(0)
  const [modules, setModules] = useState<any[]>([])
  const [results, setResults] = useState<any[]>([])

  const handleModuleChange = (index: number, field: string, value: any) => {
    const updatedModules = [...modules]
    updatedModules[index] = {
      ...updatedModules[index],
      [field]: value,
      questions: updatedModules[index]?.questions || [],
    }
    setModules(updatedModules)
  }

  const handleQuestionCountChange = (index: number, count: number) => {
    const updatedModules = [...modules]
    updatedModules[index].questions = Array.from({ length: count }, (_, i) => updatedModules[index].questions?.[i] || "")
    setModules(updatedModules)
  }

  const handleQuestionMarkChange = (modIdx: number, quesIdx: number, value: number) => {
    const updatedModules = [...modules]
    updatedModules[modIdx].questions[quesIdx] = value
    setModules(updatedModules)
  }

  const generateModules = () => {
    const mods = Array.from({ length: numModules }, () => ({ name: "", questions: [] }))
    setModules(mods)
  }

  const handleSubmit = () => {
    const result = {
      cie,
      modules,
    }
    setResults(prev => [...prev, result])
    setCie("CIE1")
    setNumModules(0)
    setModules([])
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Question Paper Setup</h2>

      <label className="block mb-2">Select CIE</label>
      <select
        className="w-full mb-4 p-2 rounded-md text-white"
        value={cie}
        onChange={e => setCie(e.target.value)}
      >
        <option value="CIE1">CIE1</option>
        <option value="CIE2">CIE2</option>
        <option value="CIE3">CIE3</option>
      </select>

      <label className="block mb-2">Enter Number of Modules</label>
      <input
        type="number"
        className="w-full mb-4 p-2 rounded-md text-white"
        value={numModules}
        onChange={e => setNumModules(Number(e.target.value))}
      />
      <button
        onClick={generateModules}
        className="mb-6 px-4 py-2 bg-[#7E5AC8] rounded-lg hover:bg-[#9B79E2] transition"
      >
        Setup Modules
      </button>

      {modules.map((mod, modIdx) => (
        <div key={modIdx} className="mb-6 border p-4 rounded-lg bg-[#2A1D3F]">
          <label className="block mb-2">Module Name</label>
          <input
            type="text"
            className="w-full mb-4 p-2 rounded-md text-white"
            value={mod.name}
            onChange={e => handleModuleChange(modIdx, "name", e.target.value)}
          />

          <label className="block mb-2">Number of Questions</label>
          <input
            type="number"
            className="w-full mb-4 p-2 rounded-md text-white"
            value={mod.questions.length}
            onChange={e => handleQuestionCountChange(modIdx, Number(e.target.value))}
          />

          {mod.questions.map((mark: any, quesIdx: number) => (
            <div key={quesIdx} className="mb-2">
              <label className="block mb-1">Question {quesIdx + 1} Marks</label>
              <input
                type="number"
                className="w-full p-2 rounded-md text-white"
                value={mark}
                onChange={e => handleQuestionMarkChange(modIdx, quesIdx, Number(e.target.value))}
              />
            </div>
          ))}
        </div>
      ))}

      {modules.length > 0 && (
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
        >
          Save Setup
        </button>
      )}

      {/* Display Saved Results */}
      {results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Saved CIE Setups</h3>
          {results.map((res, i) => (
            <div key={i} className="mb-6 p-4 rounded-lg bg-[#3A2C53] border border-[#7E5AC8]">
              <h4 className="text-lg font-semibold mb-2">{res.cie}</h4>
              {res.modules.map((mod: any, idx: number) => (
                <div key={idx} className="mb-3">
                  <p className="font-medium text-[#EADCF9]">Module: {mod.name}</p>
                  <ul className="list-disc ml-6">
                    {mod.questions.map((mark: number, qIdx: number) => (
                      <li key={qIdx}>Q{qIdx + 1}: {mark} marks</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Mark Entry Form
const MarkEntryForm = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Mark Entry</h2>
    <label className="block mb-2">Enter marks</label>
    <input className="w-full p-2 rounded-md text-white" type="text" />
  </div>
)

// Result Analysis Form
const ResultAnalysisForm = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Result Analysis</h2>
    <label className="block mb-2">Upload/Describe Analysis</label>
    <textarea className="w-full p-2 rounded-md text-white" rows={4} />
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
        return <p className="p-6">Please select an option from the sidebar.</p>
    }
  }

  return (
    <div className="flex min-h-screen bg-[#1A132B] font-sans text-white">
      <Sidebar setActiveForm={setActiveForm} />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Course: {courseName}</h1>
        {renderForm()}
      </main>
    </div>
  )
}
