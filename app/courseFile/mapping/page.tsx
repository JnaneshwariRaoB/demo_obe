'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Aside from '../../components/Aside/Aside'

const pos = [...Array(12)].map((_, i) => `PO${i + 1}`)
const psos = ['PSO1', 'PSO2']
const cos = ['C201.1', 'C201.2', 'C201.3', 'C201'] // Add more COs as needed
const levels = ['1', '2', '3']

export default function MappingPage() {
  const [matrix, setMatrix] = useState(
    cos.reduce((acc, co) => {
      acc[co] = [...pos, ...psos].reduce((innerAcc, code) => {
        innerAcc[code] = { level: '' }
        return innerAcc
      }, {} as Record<string, { level: string }>)

      return acc
    }, {} as Record<string, Record<string, { level: string }>>)
  )

  const [submitted, setSubmitted] = useState(false)
  const [view, setView] = useState('mapping')
  const router = useRouter()

  const handleLevelChange = (co: string, code: string, value: string) => {
    if (submitted) return
    setMatrix(prev => ({
      ...prev,
      [co]: {
        ...prev[co],
        [code]: {
          level: value,
        },
      },
    }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const redirectTo = (path: string) => {
    router.push(`/${path}`)
  }

  return (
    <div className="flex min-h-screen bg-[#1A132B] text-white font-sans">
      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">CO-PO / PSO Mapping Matrix</h1>

        <div className="overflow-x-auto mb-6">
          <table className="table-auto border-collapse w-full text-sm bg-[#2B1F3A] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#322348] text-white">
                <th className="border border-[#7E5AC8] p-2">CO / PO-PSO</th>
                {[...pos, ...psos].map(code => (
                  <th key={code} className="border border-[#7E5AC8] p-2 text-center">
                    {code}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cos.map(co => (
                <tr key={co}>
                  <td className="border border-[#7E5AC8] p-2 font-semibold text-[#C8B5E9]">
                    {co}
                  </td>
                  {[...pos, ...psos].map(code => (
                    <td key={code} className="border border-[#7E5AC8] p-2">
                      <select
                        value={matrix[co][code].level}
                        onChange={e => handleLevelChange(co, code, e.target.value)}
                        disabled={submitted}
                        className="w-full p-1 rounded-md text-black disabled:bg-gray-300"
                      >
                        <option value="">-</option>
                        {levels.map(lvl => (
                          <option key={lvl} value={lvl}>
                            {lvl}
                          </option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitted}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            submitted ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#7E5AC8] hover:bg-purple-700'
          }`}
        >
          {submitted ? 'Submitted' : 'Submit Mapping'}
        </button>
      </div>
    </div>
  )
}
