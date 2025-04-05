'use client'

import { useState } from 'react'

type BeyondEntry = {
  topic: string
  relevance: string
  description: string
  coMapped: string
  modeOfDelivery: string
}

export default function BeyondPage() {
  const [entries, setEntries] = useState<BeyondEntry[]>([])
  const [current, setCurrent] = useState<BeyondEntry>({
    topic: '',
    relevance: '',
    description: '',
    coMapped: '',
    modeOfDelivery: '',
  })
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const handleChange = (field: keyof BeyondEntry, value: string) => {
    setCurrent((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updated = [...entries]
      updated[editIndex] = current
      setEntries(updated)
      setEditIndex(null)
    } else {
      setEntries((prev) => [...prev, current])
    }

    setCurrent({
      topic: '',
      relevance: '',
      description: '',
      coMapped: '',
      modeOfDelivery: '',
    })
  }

  const handleEdit = (index: number) => {
    setCurrent(entries[index])
    setEditIndex(index)
  }

  return (
    <div className="min-h-screen bg-[#1A132B] text-white p-10 font-serif">
      <h1 className="text-3xl font-bold mb-6">Beyond Curriculum Entry</h1>

      <div className="bg-[#2B1F3A] p-6 rounded-xl border border-[#7E5AC8] space-y-4 mb-10">
        <div>
          <label className="block font-medium mb-1">1. Topic Name:</label>
          <input
            type="text"
            value={current.topic}
            onChange={(e) => handleChange('topic', e.target.value)}
            className="w-full p-2 rounded-md text-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            2. Relevance (Industry / Placement / Research / Others):
          </label>
          <input
            type="text"
            value={current.relevance}
            onChange={(e) => handleChange('relevance', e.target.value)}
            className="w-full p-2 rounded-md text-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">3. Description:</label>
          <textarea
            value={current.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full p-2 rounded-md text-black"
            rows={3}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">4. CO Mapped:</label>
          <input
            type="text"
            value={current.coMapped}
            onChange={(e) => handleChange('coMapped', e.target.value)}
            className="w-full p-2 rounded-md text-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">5. Mode of Delivery:</label>
          <input
            type="text"
            value={current.modeOfDelivery}
            onChange={(e) => handleChange('modeOfDelivery', e.target.value)}
            className="w-full p-2 rounded-md text-black"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-[#7E5AC8] px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          {editIndex !== null ? 'Update Entry' : 'Add Entry'}
        </button>
      </div>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="bg-[#322348] p-5 rounded-lg border border-[#7E5AC8]"
          >
            <h2 className="text-xl font-semibold text-[#C8B5E9]">{entry.topic}</h2>
            <p>
              <span className="font-medium text-[#C8B5E9]">Relevance:</span> {entry.relevance}
            </p>
            <p>
              <span className="font-medium text-[#C8B5E9]">Description:</span> {entry.description}
            </p>
            <p>
              <span className="font-medium text-[#C8B5E9]">CO Mapped:</span> {entry.coMapped}
            </p>
            <p>
              <span className="font-medium text-[#C8B5E9]">Mode of Delivery:</span> {entry.modeOfDelivery}
            </p>

            <button
              onClick={() => handleEdit(index)}
              className="mt-3 bg-[#7E5AC8] px-4 py-1 rounded hover:bg-purple-600"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
