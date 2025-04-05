'use client';

import { useState } from 'react';

const sections = [
  'Vision to PSO',
  'Syllabus',
  'Timetable',
  'CO-PO Mapping',
  'Curriculum Gap Analysis',
  'Content Beyond Syllabus',
  'Action Plans',
  'Assessment Tools',
];

export default function VisionMissionPEOPSOPO() {
  const [activeSection, setActiveSection] = useState('Vision to PSO');

  const dummyTimetable = ` 
  ┌──────────────┬────────────┬────────────┬────────────┬────────────┐
  │ Time         │ Monday     │ Tuesday    │ Wednesday  │ Thursday   │
  ├──────────────┼────────────┼────────────┼────────────┼────────────┤
  │ 9:00 - 10:00 │ Maths      │ Physics    │ Chemistry  │ CS Lab     │
  │ 10:00-11:00  │ Mechanics  │ Maths      │ Physics    │ Electrical │
  │ 11:15-12:15  │ Break      │ Break      │ Break      │ Break      │
  │ 12:15-1:15   │ Workshop   │ Chemistry  │ English    │ Physics    │
  └──────────────┴────────────┴────────────┴────────────┴────────────┘
  `;

  const dummySyllabus = ` 
  1. Engineering Mathematics
     - Calculus, Differential Equations, Linear Algebra

  2. Engineering Physics
     - Quantum Mechanics, Electromagnetism, Optics

  3. Engineering Chemistry
     - Atomic Structure, Thermodynamics, Organic Chemistry

  4. Computer Programming
     - Basics of C, Data Structures, Algorithms
  `;

  const dummyMappingMatrix = `
        | CO \\ PO | PO1 | PO2 | PO3 | PO4 | PO5 | PO6 |
        |---------|-----|-----|-----|-----|-----|-----|
        |   CO1   |  3  |  2  |  1  |  -  |  -  |  -  |
        |   CO2   |  -  |  2  |  2  |  3  |  1  |  -  |
        |   CO3   |  1  |  -  |  3  |  -  |  2  |  1  |
        |   CO4   |  -  |  -  |  -  |  1  |  3  |  2  |
  `;

  const gapAnalysis = {
    futureSkill: "Integration of AI and ML concepts into core courses to align with AICTE's Future Skills initiative.",
    competitiveExam: "Include advanced problem-solving topics and mock tests to help students prepare for GATE and other exams.",
    benchmarking: "Adapt curriculum structure and electives based on top NIRF-ranked institutions.",
    industry: "Add project-based learning modules and certifications in cloud computing, data analytics, and cybersecurity."
  };

  const dummyBeyondSyllabus = `
    1. Guest Lecture on AI in Healthcare
    2. Seminar on Blockchain Applications
    3. Industrial Visit to Tech Park
    4. Hands-on Workshop on IoT
  `;

  const dummyActionPlans = `
    1. Add elective on "AI for Engineers"
    2. Introduce capstone projects in final year
    3. Conduct monthly industry expert talks
  `;

  const dummyAssessmentTools = `
    1. Quiz
    2. Assignment
    3. Lab Exam
    4. End Semester Exam
    5. Project Evaluation
  `;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#120C1C] via-[#1F142B] to-[#0A0710] text-white font-serif">
      <aside className="w-64 bg-[#1D1529] border-r border-[#7E5AC8] p-6 space-y-4 sticky top-0 h-screen">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSection === section
                ? 'bg-[#7E5AC8] text-white'
                : 'bg-transparent text-[#EADCF9] hover:bg-[#2B1D3A]'
            }`}
          >
            {section}
          </button>
        ))}
      </aside>

      <main className="flex-1 p-10">
        <div className="bg-[#1D1529]/70 border border-[#7E5AC8] rounded-2xl shadow-xl p-8 space-y-6">
          {renderSectionContent(
            activeSection,
            dummyTimetable,
            dummySyllabus,
            dummyMappingMatrix,
            gapAnalysis,
            dummyBeyondSyllabus,
            dummyActionPlans,
            dummyAssessmentTools
          )}
        </div>
      </main>
    </div>
  );
}

function renderSectionContent(
  section: string,
  timetable: string,
  syllabus: string,
  mapping: string,
  gapAnalysis: any,
  beyond: string,
  actions: string,
  tools: string
) {
  switch (section) {
    case 'Vision to PSO':
      return (
        <>
          <Section title="Vision">
            To be a center of excellence in technical education and research, nurturing professionals who contribute to the development of society.
          </Section>
          <Section title="Mission">
            To impart quality education and foster innovation through dedicated teaching and collaborative learning.
          </Section>
          <Section title="PEO">
            <ul className="list-disc ml-6">
              <li>PEO1: Foundation in core subjects</li>
              <li>PEO2: Adaptability to new tech</li>
              <li>PEO3: Ethics and professionalism</li>
            </ul>
          </Section>
          <Section title="PO">
            <ul className="list-decimal ml-6 space-y-1">
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
          <Section title="PSO">
            <ul className="list-disc ml-6">
              <li>PSO1: Apply CS knowledge to real problems</li>
              <li>PSO2: Proficiency with modern tools</li>
            </ul>
          </Section>
        </>
      );
    case 'Syllabus':
      return (
        <Section title="Syllabus">
          <pre className="whitespace-pre-wrap">{syllabus}</pre>
        </Section>
      );
    case 'Timetable':
      return (
        <Section title="Timetable">
          <pre className="whitespace-pre-wrap">{timetable}</pre>
        </Section>
      );
    case 'CO-PO Mapping':
      return (
        <Section title="CO-PO/PSO Mapping Matrix">
          <pre className="whitespace-pre-wrap">{mapping}</pre>
        </Section>
      );
    case 'Curriculum Gap Analysis':
      return (
        <Section title="Curriculum Gap Analysis">
          <ul className="space-y-2 list-disc ml-6">
            <li><b>Future Skills:</b> {gapAnalysis.futureSkill}</li>
            <li><b>Competitive Exams:</b> {gapAnalysis.competitiveExam}</li>
            <li><b>Benchmarking:</b> {gapAnalysis.benchmarking}</li>
            <li><b>Industry Relevance:</b> {gapAnalysis.industry}</li>
          </ul>
        </Section>
      );
    case 'Content Beyond Syllabus':
      return (
        <Section title="Content Beyond Syllabus">
          <pre className="whitespace-pre-wrap">{beyond}</pre>
        </Section>
      );
    case 'Action Plans':
      return (
        <Section title="Action Plans for Enhancement">
          <pre className="whitespace-pre-wrap">{actions}</pre>
        </Section>
      );
    case 'Assessment Tools':
      return (
        <Section title="Assessment Tools">
          <pre className="whitespace-pre-wrap">{tools}</pre>
        </Section>
      );
    default:
      return <Section title="Info">Please select a valid section.</Section>;
  }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#C5B0F3] mb-3 border-b border-[#7E5AC8] pb-1">{title}</h2>
      <div className="text-lg leading-relaxed text-[#EADCF9]">{children}</div>
    </div>
  );
}
