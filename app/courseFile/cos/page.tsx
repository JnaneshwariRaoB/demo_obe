'use client'

import { useState } from 'react'
import Aside from '../../components/Aside/Aside'

interface Module {
  statement: string
  bloomsLevel: string
}

export default function COSPage() {
  const [step, setStep] = useState(1)
  const [numModules, setNumModules] = useState(0)
  const [modules, setModules] = useState<Module[]>([])
  const [currentModules, setCurrentModules] = useState<Module[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [view, setView] = useState<'course' | 'vision'>('course')

  const handleModuleChange = (index: number, field: keyof Module, value: string) => {
    const updated = [...currentModules]
    updated[index][field] = value
    setCurrentModules(updated)
  }

  const handleSubmitModules = () => {
    setModules(currentModules)
    setStep(3)
  }

  const startEditing = (index: number) => {
    setEditingIndex(index)
    setCurrentModules([modules[index]])
    setStep(2)
  }

  const handleUpdate = () => {
    const updatedModules = [...modules]
    if (editingIndex !== null) {
      updatedModules[editingIndex] = currentModules[0]
      setModules(updatedModules)
      setEditingIndex(null)
    }
    setStep(3)
  }

  const redirectTo = (path: string) => {
    window.location.href = `/${path}`
  }

  return (
    <div className="min-h-screen flex font-serif">
      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-[#0D0B1F] via-[#1A132B] to-[#110A1C] p-10 text-white">
        <h1 className="text-3xl font-bold mb-6">CO's Entry</h1>

        {step === 1 && (
          <div className="max-w-md bg-[#2B1F3A] p-6 rounded-xl border border-[#7E5AC8] space-y-4">
            <label className="block mb-2">Enter Number of Modules:</label>
            <input
              type="number"
              min={1}
              value={numModules}
              onChange={(e) => setNumModules(parseInt(e.target.value))}
              className="w-full p-2 rounded-md text-black"
            />
            <button
              onClick={() => {
                setCurrentModules(Array(numModules).fill({ statement: '', bloomsLevel: '' }))
                setStep(2)
              }}
              className="bg-[#7E5AC8] px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {currentModules.map((module, idx) => (
              <div key={idx} className="bg-[#2B1F3A] p-6 rounded-xl border border-[#7E5AC8]">
                <h2 className="text-xl font-semibold mb-4">Module {editingIndex !== null ? '' : idx + 1}</h2>

                <label className="block mb-1 font-medium">CO Statement for Module {idx + 1}:</label>
                <input
                  type="text"
                  value={module.statement}
                  onChange={(e) => handleModuleChange(idx, 'statement', e.target.value)}
                  className="w-full p-2 mb-1 text-black rounded-md"
                />
                <p className="text-sm text-purple-300 mb-4">
                  Enter a clear and measurable statement describing what students should be able to do after the module.
                </p>

                <label className="block mb-2">Bloom's Level:</label>
                <select
                  value={module.bloomsLevel}
                  onChange={(e) => handleModuleChange(idx, 'bloomsLevel', e.target.value)}
                  className="w-full p-2 text-black rounded-md"
                >
                  <option value="">Select Bloom's Level</option>
                  <option value="CL1">CL1 – Remember</option>
                  <option value="CL2">CL2 – Understand</option>
                  <option value="CL3">CL3 – Apply</option>
                  <option value="CL4">CL4 – Analyze</option>
                  <option value="CL5">CL5 – Evaluate</option>
                  <option value="CL6">CL6 – Create</option>
                </select>
              </div>
            ))}

            <button
              onClick={editingIndex !== null ? handleUpdate : handleSubmitModules}
              className="bg-[#7E5AC8] px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              {editingIndex !== null ? 'Update' : 'Submit'}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module, idx) => (
              <div
                key={idx}
                className="bg-[#2B1F3A] p-6 rounded-xl border border-[#7E5AC8] shadow-md space-y-2"
              >
                <h3 className="text-lg font-semibold text-white">Module {idx + 1}</h3>
                <p>
                  <span className="font-bold text-[#C8B5E9]">CO Statement:</span> {module.statement}
                </p>
                <p>
                  <span className="font-bold text-[#C8B5E9]">Bloom’s Level:</span> {module.bloomsLevel} – {
                    {
                      CL1: 'Remember',
                      CL2: 'Understand',
                      CL3: 'Apply',
                      CL4: 'Analyze',
                      CL5: 'Evaluate',
                      CL6: 'Create',
                    }[module.bloomsLevel]
                  }
                </p>
                <button
                  onClick={() => startEditing(idx)}
                  className="mt-2 text-sm bg-[#7E5AC8] px-3 py-1 rounded hover:bg-purple-700"
                >
                  Edit
                </button>
              </div>
            ))}
            <button
              onClick={() => setStep(1)}
              className="col-span-full bg-[#322348] text-sm px-4 py-2 mt-4 rounded-lg hover:bg-[#7E5AC8]"
            >
              Add More Modules
            </button>
          </div>
        )}
      </div>
    </div>
  )
}