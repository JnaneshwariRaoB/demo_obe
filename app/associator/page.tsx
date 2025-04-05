'use client';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#C5B0F3] mb-3 border-b border-[#7E5AC8] pb-1">{title}</h2>
      <p className="text-lg leading-relaxed text-[#EADCF9]">{children}</p>
    </div>
  );
}

export default function VisionMissionPEOPSOPO() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120C1C] via-[#1F142B] to-[#0A0710] text-white font-serif p-10">
      <div className="bg-[#1D1529]/70 border border-[#7E5AC8] rounded-2xl shadow-xl p-8 max-w-6xl mx-auto space-y-8">

        <Section title="Vision">
          To be a center of excellence...
        </Section>

        {/* All other sections here... */}
        
      </div>
    </div>
  );
}
