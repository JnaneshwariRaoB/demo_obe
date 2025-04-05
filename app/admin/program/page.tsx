'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Program {
  id: number
  name: string
  dept: string
}

export default function ProgramPage() {
  const searchParams = useSearchParams()
  const dept = searchParams.get('dept')

  const [programs, setPrograms] = useState<Program[]>([])
  const [newProgram, setNewProgram] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('programs')
    const allPrograms: Program[] = stored ? JSON.parse(stored) : []
    const deptPrograms = allPrograms.filter((p) => p.dept === dept)
    setPrograms(deptPrograms)
  }, [dept])

  const updateLocalStorage = (updated: Program[]) => {
    const allPrograms: Program[] = JSON.parse(localStorage.getItem('programs') || '[]')
    const others = allPrograms.filter((p) => p.dept !== dept)
    localStorage.setItem('programs', JSON.stringify([...others, ...updated]))
  }

  const handleAddProgram = () => {
    if (!newProgram.trim()) return
    const newEntry: Program = {
      id: Date.now(),
      name: newProgram.trim(),
      dept: dept || 'Unknown',
    }
    const updated = [newEntry, ...programs]
    setPrograms(updated)
    updateLocalStorage(updated)
    setNewProgram('')
  }

  const startEdit = (id: number, name: string) => {
    setEditId(id)
    setEditName(name)
  }

  const handleSaveEdit = () => {
    const updated = programs.map((p) =>
      p.id === editId ? { ...p, name: editName } : p
    )
    setPrograms(updated)
    updateLocalStorage(updated)
    setEditId(null)
    setEditName('')
  }

  const handleDelete = (id: number) => {
    const updated = programs.filter((p) => p.id !== id)
    setPrograms(updated)
    updateLocalStorage(updated)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1123] to-[#2A1B33] text-white font-serif p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-[#332244] border-4 border-[#9B72CF] rounded-3xl p-8 shadow-2xl">

        <h1 className="text-3xl font-bold mb-10 text-center">
          Programs in Department: <span className="text-white">{dept}</span>
        </h1>

        {/* Existing Programs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 underline underline-offset-4 decoration-[#9B72CF] text-center">
            Existing Programs
          </h2>
          {programs.length === 0 ? (
            <p className="text-center text-[#D8C7EB] font-bold">No programs added yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {programs.map((prog) =>
                editId === prog.id ? (
                  <div key={prog.id} className="bg-[#4A355F] border border-[#9B72CF] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full sm:w-auto flex-1 px-3 py-2 rounded-lg bg-[#3A2B4F] border border-[#9B72CF] text-white font-bold"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="bg-gradient-to-r from-[#9B72CF] to-[#6C3CA5] px-4 py-2 rounded-lg text-white font-bold hover:from-[#53316E] hover:to-[#8A5EC2]"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditId(null)
                          setEditName('')
                        }}
                        className="bg-[#6C3CA5] px-4 py-2 rounded-lg text-white font-bold hover:bg-[#5A2C89]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={prog.id}
                    className="bg-[#4A355F] border border-[#9B72CF] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg"
                  >
                    <Link
                      href={`/admin/programpage?dept=${encodeURIComponent(prog.dept)}&prog=${encodeURIComponent(prog.name)}`}
                      className="font-bold hover:underline text-center sm:text-left w-full sm:w-auto"
                    >
                      {prog.name}
                    </Link>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(prog.id, prog.name)}
                        className="bg-[#9B72CF] px-4 py-2 rounded-lg text-white font-bold hover:bg-[#A884E3]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(prog.id)}
                        className="bg-red-600 px-4 py-2 rounded-lg text-white font-bold hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Add New Program */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Add New Program</h2>
          <label className="block mb-2 font-bold text-white">Program Name</label>
          <input
            type="text"
            value={newProgram}
            onChange={(e) => setNewProgram(e.target.value)}
            placeholder="Enter new program name"
            className="w-full p-3 rounded-xl border border-[#9B72CF] bg-[#4A355F] placeholder-[#D8C7EB] text-white font-bold focus:outline-none focus:ring-2 focus:ring-[#9B72CF] shadow-sm"
          />
          <button
            onClick={handleAddProgram}
            className="w-full mt-3 bg-gradient-to-r from-[#9B72CF] to-[#6C3CA5] text-white font-bold py-2 rounded-xl hover:from-[#53316E] hover:to-[#8A5EC2] shadow-lg transition"
          >
            Add Program
          </button>
        </div>
      </div>
    </div>
  )
}
