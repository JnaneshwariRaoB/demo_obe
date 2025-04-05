import Link from "next/link";

export default function HODDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#120C1C] via-[#1F142B] to-[#0A0710] p-8 font-serif text-[#EADCF9]">
      <div className="w-full max-w-5xl bg-[#1D1529]/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-[#7E5AC8]">
        <h2 className="text-5xl font-extrabold text-center mb-10 text-[#EADCF9] tracking-wider drop-shadow-md">
          HOD Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { href: "/hod/academics", label: "ACADEMICS" },
            { href: "/hod/faculty", label: "FACULTY" },
            { href: "/hod/administration", label: "ADMINISTRATION" },
            { href: "/hod/activities", label: "ACTIVITIES" },
            { href: "/hod/research", label: "RESEARCH" },
            { href: "/hod/student", label: "STUDENT" },
          ].map(({ href, label }) => (
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
