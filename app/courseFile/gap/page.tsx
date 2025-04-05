'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Aside from '../../components/Aside/Aside'

export default function GapAnalysisSection() {
  const searchParams = useSearchParams()
  const courseName = searchParams.get('course') || 'Unknown Course'

  const [view, setView] = useState<'course' | 'vision'>('course')
  const [step, setStep] = useState(4)
  const [gapAnalysis, setGapAnalysis] = useState({
    futureSkill: '',
    competitiveExam: '',
    benchmarking: '',
    industry: ''
  })

  const router = useRouter()
  const redirectTo = (path: string) => {
    router.push(`/${path}`)
  }

  const handleGapChange = (field: keyof typeof gapAnalysis, value: string) => {
    setGapAnalysis((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex font-serif">
      {/* Sidebar */}
      

      {/* Main content */}
      <main className="flex-1 bg-gradient-to-br from-[#0D0B1F] via-[#1A132B] to-[#110A1C] p-10 text-white">
        <h1 className="text-3xl font-bold mb-6">Gap Analysis for {courseName}</h1>

        {step === 4 && (
          <div className="space-y-6 bg-[#2B1F3A] p-6 rounded-xl border border-[#7E5AC8] mt-6">
            <h2 className="text-2xl font-semibold mb-4">Gap Analysis</h2>

            <div>
              <label className="block mb-1 font-medium">
                1. Relevance of the topic to the AICTE Future Skills.
              </label>
              <input
                type="text"
                placeholder="Topic – Which Future Skill"
                value={gapAnalysis.futureSkill}
                onChange={(e) => handleGapChange('futureSkill', e.target.value)}
                className="w-full p-2 text-black rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                2. Competitive Examination Syllabus (GATE/NET/SET/Others):
              </label>
              <input
                type="text"
                placeholder="Topic – Syllabus"
                value={gapAnalysis.competitiveExam}
                onChange={(e) => handleGapChange('competitiveExam', e.target.value)}
                className="w-full p-2 text-black rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                3. Benchmarking Institutions:
              </label>
              <input
                type="text"
                placeholder="Institute Name: Topic"
                value={gapAnalysis.benchmarking}
                onChange={(e) => handleGapChange('benchmarking', e.target.value)}
                className="w-full p-2 text-black rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                4. Relevance to the Industry:
              </label>
              <input
                type="text"
                placeholder="Industry Name: Domain: Topic used"
                value={gapAnalysis.industry}
                onChange={(e) => handleGapChange('industry', e.target.value)}
                className="w-full p-2 text-black rounded-md"
              />
            </div>

            <button
              onClick={() => setStep(5)}
              className="bg-[#7E5AC8] px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Submit Gap Analysis
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4 bg-[#2B1F3A] p-6 rounded-xl border border-[#7E5AC8] mt-6">
            <h2 className="text-2xl font-bold text-white">Gap Analysis Summary for {courseName}</h2>

            <p>
              <span className="font-semibold text-[#C8B5E9]">1. AICTE Future Skills:</span> {gapAnalysis.futureSkill}
            </p>
            <p>
              <span className="font-semibold text-[#C8B5E9]">2. Competitive Exams:</span> {gapAnalysis.competitiveExam}
            </p>
            <p>
              <span className="font-semibold text-[#C8B5E9]">3. Benchmarking Institutions:</span> {gapAnalysis.benchmarking}
            </p>
            <p>
              <span className="font-semibold text-[#C8B5E9]">4. Industry Relevance:</span> {gapAnalysis.industry}
            </p>

            <button
              onClick={() => setStep(4)}
              className="bg-[#322348] px-4 py-2 rounded-lg hover:bg-[#7E5AC8]"
            >
              Edit Gap Analysis
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
