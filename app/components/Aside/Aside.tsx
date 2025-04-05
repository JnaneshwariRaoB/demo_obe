'use client'

import { useRouter } from 'next/navigation'

interface AsideProps {
  view: string
  setView: (view: string) => void
}

export default function Aside({ view, setView }: AsideProps) {
  const router = useRouter()

  const redirectTo = (path: string) => {
    router.push(`/${path}`)
  }

  return (
    <aside className="w-64 p-6 bg-[#1C152C] border-r border-[#7E5AC8]">
      <h2 className="text-xl font-bold mb-4 text-[#EADCF9]">Navigation</h2>

      <button
        onClick={() => setView('course')}
        className={`w-full text-left py-2 px-4 mb-2 rounded-lg ${
          view === 'course' ? 'bg-[#7E5AC8]' : 'bg-[#322348]'
        } hover:bg-[#7E5AC8] transition`}
      >
        Course
      </button>

      <button
        onClick={() => setView('vision')}
        className={`w-full text-left py-2 px-4 mb-4 rounded-lg ${
          view === 'vision' ? 'bg-[#7E5AC8]' : 'bg-[#322348]'
        } hover:bg-[#7E5AC8] transition`}
      >
        Vision & Mission
      </button>

      <button
        onClick={() => redirectTo('cos')}
        className="w-full text-left py-2 px-4 mb-2 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition"
      >
        List of COs
      </button>

      <button
        onClick={() => redirectTo('gap')}
        className="w-full text-left py-2 px-4 mb-2 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition"
      >
        Curriculum Gap
      </button>

      <button
        onClick={() => redirectTo('beyond')}
        className="w-full text-left py-2 px-4 mb-2 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition"
      >
        Content Beyond Syllabus
      </button>

      <button
        onClick={() => redirectTo('action')}
        className="w-full text-left py-2 px-4 mb-2 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition"
      >
        Action
      </button>

      <button
        onClick={() => redirectTo('mapping')}
        className="w-full text-left py-2 px-4 rounded-lg bg-[#322348] hover:bg-[#7E5AC8] transition"
      >
        CO-PO Mapping
      </button>
    </aside>
  )
}
