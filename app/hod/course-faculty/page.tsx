'use client'

import { useState } from 'react'

export default function CourseFacultyMappingPage() {
  const facultyOptions = ['Dr. Smith', 'Prof. Johnson', 'Ms. Clark', 'Mr. Lee', 'Dr. Watson']
  const subjects = ['Data Structures', 'COA', 'DBMS', 'Operating Systems', 'DAA']
  const sectionLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const [step, setStep] = useState(1)
  const [intake, setIntake] = useState<number | ''>('') // intake number
  const [batch, setBatch] = useState('') // current batch
  const [sections, setSections] = useState<string[]>([]) // current batch sections
  const [facultyMapping, setFacultyMapping] = useState<any[]>([]) // current batch mapping
  const [submittedData, setSubmittedData] = useState<any[]>([]) // list of submitted batches
  const [sampleStudents, setSampleStudents] = useState<Record<string, string[]>>({}) // current student set

  const randomNames = ['Alex', 'Jordan', 'Taylor', 'Riley', 'Casey', 'Morgan', 'Jamie', 'Drew', 'Blake', 'Quinn']

  const generateRandomStudentName = (section: string) => {
    const name = randomNames[Math.floor(Math.random() * randomNames.length)]
    const number = Math.floor(1000 + Math.random() * 9000)
    return `${name}_${section}${number}`
  }

  const generateSections = (intake: number) => {
    const count = Math.ceil(intake / 60)
    const newSections = sectionLetters.slice(0, count)
    const studentObj: Record<string, string[]> = {}
    newSections.forEach((sec) => {
      studentObj[sec] = Array.from({ length: 60 }, () => generateRandomStudentName(sec))
    })
    setSections(newSections)
    setSampleStudents(studentObj)
  }

  const startFacultyMapping = () => {
    const initialMapping = subjects.map(subject => {
      const map: any = { subject, coordinator: '' }
      sections.forEach((s) => (map[`section${s}`] = ''))
      return map
    })
    setFacultyMapping(initialMapping)
    setStep(5)
  }

  const handleFacultyChange = (index: number, field: string, value: string) => {
    const updated = [...facultyMapping]
    updated[index][field] = value
    setFacultyMapping(updated)
  }

  const handleSubmit = () => {
    const onlyAssigned = facultyMapping.filter(
      (mapping) => sections.some(s => mapping[`section${s}`]) || mapping.coordinator
    )

    const batchData = {
      batch,
      sections,
      students: sampleStudents,
      mapping: onlyAssigned
    }

    setSubmittedData(prev => [...prev, batchData])
    resetForm()
  }

  const resetForm = () => {
    setStep(1)
    setIntake('')
    setBatch('')
    setSections([])
    setFacultyMapping([])
    setSampleStudents({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120C1C] via-[#1F142B] to-[#0A0710] text-white font-serif p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-[#1D1529]/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-[#7E5AC8]">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-[#EADCF9] tracking-wider drop-shadow-md">
          Course-Faculty Mapping
        </h2>

        {/* Step 1: Intake */}
        {step === 1 && (
          <div className="text-center">
            <label className="block text-lg mb-3 font-semibold text-white">Enter Student Intake:</label>
            <input
              type="number"
              value={intake}
              onChange={(e) => setIntake(Number(e.target.value))}
              placeholder="e.g., 180"
              className="p-3 rounded-xl w-60 bg-[#2B1F3A] text-white border border-[#9B72CF] placeholder:text-gray-300"
            />
            <button
              onClick={() => {
                if (typeof intake === 'number' && intake > 0) {
                  generateSections(intake)
                  setStep(2)
                }
              }}
              className="ml-4 px-5 py-2 bg-[#7E5AC8] rounded-xl hover:bg-[#9B72CF] text-white font-bold"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Batch Entry */}
        {step === 2 && (
          <div className="text-center">
            <label className="block text-lg mb-3 font-semibold text-white">Enter Batch:</label>
            <input
              type="text"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              placeholder="e.g., 2022-26"
              className="p-3 rounded-xl w-60 bg-[#2B1F3A] text-white border border-[#9B72CF] placeholder:text-gray-300"
            />
            <button
              onClick={() => setStep(3)}
              disabled={!batch}
              className="ml-4 px-5 py-2 bg-[#7E5AC8] rounded-xl hover:bg-[#9B72CF] text-white font-bold"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 3: Show Sections */}
        {step === 3 && (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Generated Sections:</h3>
            <div className="flex justify-center space-x-4 text-lg mb-6">
              {sections.map((sec) => (
                <span key={sec} className="px-3 py-1 bg-[#3A2952] rounded-xl">{sec}</span>
              ))}
            </div>
            <button
              onClick={() => setStep(4)}
              className="px-6 py-2 bg-[#9B72CF] rounded-xl hover:bg-[#7E5AC8] text-white font-bold"
            >
              Show Students
            </button>
          </div>
        )}

        {/* Step 4: Show Students */}
        {step === 4 && (
          <div>
            <h3 className="text-2xl font-bold text-center mb-6">Students in Each Section</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {sections.map((sec) => (
                <div key={sec} className="bg-[#2B1F3A] p-4 rounded-xl border border-[#9B72CF]">
                  <h4 className="font-bold text-lg text-center text-[#EADCF9] mb-2">Section {sec}</h4>
                  <ul className="list-disc list-inside text-white space-y-1">
                    {sampleStudents[sec]?.slice(0, 5).map((student, idx) => (
                      <li key={idx}>{student}</li>
                    ))}
                    <li>...and more</li>
                  </ul>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={startFacultyMapping}
                className="px-6 py-2 bg-[#9B72CF] rounded-xl hover:bg-[#7E5AC8] text-white font-bold"
              >
                Proceed to Faculty Mapping
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Faculty Mapping */}
        {step === 5 && (
          <>
            <div className="overflow-x-auto mt-8">
              <table className="w-full text-center border border-[#9B72CF] rounded-lg overflow-hidden">
                <thead className="bg-[#2B1F3A] text-white">
                  <tr>
                    <th className="py-3 px-2 border border-[#7E5AC8]">Subject</th>
                    {sections.map((sec) => (
                      <th key={sec} className="py-3 px-2 border border-[#7E5AC8]">Section {sec}</th>
                    ))}
                    <th className="py-3 px-2 border border-[#7E5AC8]">Coordinator</th>
                  </tr>
                </thead>
                <tbody>
                  {facultyMapping.map((mapping, i) => {
                    const selectedFaculties = sections
                      .map((s) => mapping[`section${s}`])
                      .filter((name, idx, arr) => name && arr.indexOf(name) === idx)

                    return (
                      <tr key={i} className="bg-[#1B1326] border border-[#7E5AC8]">
                        <td className="py-3 px-2 font-semibold text-white border border-[#7E5AC8]">
                          {mapping.subject}
                        </td>
                        {sections.map((sec) => (
                          <td key={sec} className="py-2 px-2 border border-[#7E5AC8]">
                            <select
                              value={mapping[`section${sec}`]}
                              onChange={(e) =>
                                handleFacultyChange(i, `section${sec}`, e.target.value)
                              }
                              className="w-full p-2 rounded-lg bg-[#2B1F3A] border border-[#9B72CF] text-white"
                            >
                              <option value="">-- Select --</option>
                              {facultyOptions.map((faculty) => (
                                <option key={faculty} value={faculty}>{faculty}</option>
                              ))}
                            </select>
                          </td>
                        ))}
                        <td className="py-2 px-2 border border-[#7E5AC8]">
                          <select
                            value={mapping.coordinator}
                            onChange={(e) =>
                              handleFacultyChange(i, 'coordinator', e.target.value)
                            }
                            className="w-full p-2 rounded-lg bg-[#2B1F3A] border border-[#9B72CF] text-white"
                          >
                            <option value="">-- Select --</option>
                            {selectedFaculties.map((faculty) => (
                              <option key={faculty} value={faculty}>{faculty}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-8 py-3 bg-gradient-to-r from-[#9B72CF] to-[#6C3CA5] text-white font-bold rounded-xl hover:from-[#53316E] hover:to-[#8A5EC2] shadow-lg transition"
            >
              Submit Mapping
            </button>
          </>
        )}

        {/* Display Submitted Data */}
        {submittedData.length > 0 && (
          <div className="mt-12 space-y-12">
            {submittedData.map((data, idx) => (
              <div key={idx} className="bg-[#2B1F3A] border border-[#9B72CF] p-6 rounded-2xl shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-4 text-center text-[#EADCF9] underline underline-offset-4 decoration-[#9B72CF]">
                  Faculty Mapping - Batch {data.batch}
                </h3>
                {data.mapping.map((m: any, i: number) => (
                  <div key={i} className="mb-4">
                    <strong>{m.subject}</strong><br />
                    {data.sections.map((s: string) => (
                      <div key={s}>Section {s}: {m[`section${s}`] || 'N/A'}</div>
                    ))}
                    Coordinator: {m.coordinator || 'N/A'}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
