'use client';

import { useState } from 'react';

export default function InnovativeTechniquesPage() {
  const [activeTab, setActiveTab] = useState('faculty');

  const [entries, setEntries] = useState([
    {
      section: 'A',
      faculty: 'Dr. Smith',
      technique: 'Mind Mapping',
      topic: 'Data Structures',
      file: 'https://example.com/mindmap.pdf',
    },
    {
      section: 'B',
      faculty: 'Prof. Alice',
      technique: 'Flipped Classroom',
      topic: 'Operating Systems',
      file: 'https://example.com/flipped-classroom.pdf',
    },
    {
      section: 'C',
      faculty: 'Mr. Johnson',
      technique: 'Gamification',
      topic: 'DBMS',
      file: 'https://example.com/gamification-notes.pdf',
    },
  ]);

  const [form, setForm] = useState({
    section: '',
    faculty: '',
    technique: '',
    topic: '',
    file: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setEntries(prev => [...prev, form]);
    setForm({ section: '', faculty: '', technique: '', topic: '', file: '' });
  };

  return (
    <div className="min-h-screen bg-[#120C1C] text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Toggle Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('faculty')}
            className={`px-4 py-2 rounded ${activeTab === 'faculty' ? 'bg-purple-700' : 'bg-gray-700'}`}
          >
            Faculty Entry
          </button>
          <button
            onClick={() => setActiveTab('consolidated')}
            className={`px-4 py-2 rounded ${activeTab === 'consolidated' ? 'bg-purple-700' : 'bg-gray-700'}`}
          >
            Consolidated View
          </button>
        </div>

        {/* Faculty Form */}
        {activeTab === 'faculty' && (
          <form onSubmit={handleSubmit} className="space-y-4 bg-[#1D1529] p-6 rounded-xl border border-purple-700">
            <h2 className="text-xl font-bold mb-4">Innovative Technique Entry</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="section"
                value={form.section}
                onChange={handleChange}
                placeholder="Section"
                className="p-2 bg-[#2A1C3C] border border-purple-700 rounded"
              />
              <input
                name="faculty"
                value={form.faculty}
                onChange={handleChange}
                placeholder="Course Associate Name"
                className="p-2 bg-[#2A1C3C] border border-purple-700 rounded"
              />
              <input
                name="technique"
                value={form.technique}
                onChange={handleChange}
                placeholder="Technique Name"
                className="p-2 bg-[#2A1C3C] border border-purple-700 rounded"
              />
              <input
                name="topic"
                value={form.topic}
                onChange={handleChange}
                placeholder="Topic"
                className="p-2 bg-[#2A1C3C] border border-purple-700 rounded"
              />
              <input
                name="file"
                value={form.file}
                onChange={handleChange}
                placeholder="Document Link or Filename"
                className="col-span-2 p-2 bg-[#2A1C3C] border border-purple-700 rounded"
              />
            </div>

            <button type="submit" className="bg-purple-700 px-4 py-2 rounded mt-4">
              Submit
            </button>
          </form>
        )}

        {/* Consolidated Table */}
        {activeTab === 'consolidated' && (
          <div className="bg-[#1D1529] p-6 rounded-xl border border-purple-700">
            <h2 className="text-xl font-bold mb-4">Consolidated Techniques</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2A1C3C]">
                  <th className="p-2 border-b border-purple-700">Sl. No.</th>
                  <th className="p-2 border-b border-purple-700">Section</th>
                  <th className="p-2 border-b border-purple-700">Faculty</th>
                  <th className="p-2 border-b border-purple-700">Technique</th>
                  <th className="p-2 border-b border-purple-700">Topic</th>
                  <th className="p-2 border-b border-purple-700">Document</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index} className="hover:bg-[#2A1C3C]">
                    <td className="p-2 border-b border-purple-700">{index + 1}</td>
                    <td className="p-2 border-b border-purple-700">{entry.section}</td>
                    <td className="p-2 border-b border-purple-700">{entry.faculty}</td>
                    <td className="p-2 border-b border-purple-700">{entry.technique}</td>
                    <td className="p-2 border-b border-purple-700">{entry.topic}</td>
                    <td className="p-2 border-b border-purple-700">
                      <a href={entry.file} className="text-purple-300 underline" target="_blank" rel="noreferrer">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
