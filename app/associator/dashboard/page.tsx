'use client';

export default function VisionMissionPEOPSOPO() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120C1C] via-[#1F142B] to-[#0A0710] text-white font-serif p-10">
      <div className="bg-[#1D1529]/70 border border-[#7E5AC8] rounded-2xl shadow-xl p-8 max-w-6xl mx-auto space-y-8">

        <Section title="Vision">
          To be a center of excellence in technical education and research, nurturing professionals who contribute to the development of society.
        </Section>

        <Section title="Mission">
          To impart quality education and foster innovation through dedicated teaching and collaborative learning, enabling students to achieve professional competence and ethical values.
        </Section>

        <Section title="Program Educational Objectives (PEO)">
          <ul className="list-disc ml-6 space-y-2 text-[#EADCF9]">
            <li><b>PEO1:</b> Graduates will succeed in professional careers or higher education by acquiring knowledge in engineering and allied disciplines.</li>
            <li><b>PEO2:</b> Graduates will demonstrate lifelong learning and adapt to evolving technologies.</li>
            <li><b>PEO3:</b> Graduates will contribute ethically and responsibly to society through engineering solutions.</li>
          </ul>
        </Section>

        <Section title="Program Outcomes (PO)">
          <ul className="list-decimal ml-6 space-y-2 text-[#EADCF9]">
            <li>Engineering knowledge</li>
            <li>Problem analysis</li>
            <li>Design/development of solutions</li>
            <li>Conduct investigations of complex problems</li>
            <li>Modern tool usage</li>
            <li>The engineer and society</li>
            <li>Environment and sustainability</li>
            <li>Ethics</li>
            <li>Individual and team work</li>
            <li>Communication</li>
            <li>Project management and finance</li>
            <li>Life-long learning</li>
          </ul>
        </Section>

        <Section title="Program Specific Outcomes (PSO)">
          <ul className="list-disc ml-6 space-y-2 text-[#EADCF9]">
            <li><b>PSO1:</b> Apply domain-specific knowledge to solve real-world engineering problems.</li>
            <li><b>PSO2:</b> Demonstrate proficiency in modern tools and technologies relevant to the discipline.</li>
          </ul>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#C5B0F3] mb-3 border-b border-[#7E5AC8] pb-1">{title}</h2>
      <p className="text-lg leading-relaxed text-[#EADCF9]">{children}</p>
    </div>
  );
}
