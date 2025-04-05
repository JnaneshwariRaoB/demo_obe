import Link from "next/link";

const CourseFileDashboard: React.FC = () => {
  const semesters: number[] = [3, 4, 5, 6, 7, 8];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#120619] p-10 font-serif text-[#E3D2FF]">
      <div className="w-full max-w-4xl bg-[#1C0E2D] p-10 rounded-3xl shadow-2xl border border-[#A275FF]">
        <h2 className="text-5xl font-extrabold text-center mb-12 text-[#E3D2FF]">
          Course File
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {semesters.map((sem) => (
            <Link
              key={sem}
              href={`/hod/course-files/sem/${sem}`}
              passHref
            >
              <div className="bg-[#2A1046] p-6 rounded-2xl text-lg text-[#E3D2FF] font-semibold text-center border border-[#A275FF] cursor-pointer hover:bg-[#3B1C63] hover:shadow-xl transition duration-300">
                Semester {sem}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseFileDashboard;
