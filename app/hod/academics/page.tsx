import Link from "next/link";

export default function HODDashboard() {
  const dashboardItems = [
    
    { href: "/hod/schema-syllabus", label: "SCHEMA & SYLLABUS" },
    { href: "/hod/course-faculty", label: "COURSE - FACULTY MAPPING" },
    { href: "/hod/course-files", label: "COURSE FILES" },
    { href: "/hod/eligibility", label: "ELIGIBILITY" },
    { href: "/hod/ne-list", label: "NE LIST" },
    { href: "/hod/transitional-grades", label: "TRANSITIONAL GRADE LIST" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#120C1C] via-[#1F142B] to-[#0A0710] p-8 font-serif text-[#EADCF9]">
     <div className="text-center mb-6 bg-[#3F3147] p-4 rounded-xl shadow-md border border-[#9C88B8]">
  <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm">
    Sahyadri College of Engineering and Management
  </h3>
  <h4 className="text-lg md:text-xl font-medium text-[#A786DF] mt-1">
    Department of Information Science & Engineering
  </h4>
</div>


      
      <div className="w-full max-w-6xl bg-[#1D1529]/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-[#7E5AC8]">
        <h2 className="text-5xl font-extrabold text-center mb-10 text-[#EADCF9] tracking-wider drop-shadow-md">
          HOD Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dashboardItems.map(({ href, label }) => (
            <Link key={href} href={href}>
              <div className="bg-[#2B1F3A] hover:bg-[#4D3A74] text-center p-6 rounded-2xl shadow-xl border border-[#9B72CF] text-lg font-semibold cursor-pointer transition-all duration-300 hover:scale-[1.03]">
                {label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
