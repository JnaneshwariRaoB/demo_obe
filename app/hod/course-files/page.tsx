"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BatchSelection() {
  const [batches, setBatches] = useState([{ batch: "", section: "", year: "" }]);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Redirect to /hod/course-files/sem on save
    router.push("/hod/course-files/sem");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#120619] font-serif text-[#E3D2FF]">
      <div className="w-full max-w-3xl p-10 bg-[#1C0E2D] border border-[#A275FF] shadow-2xl rounded-3xl">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-[#E3D2FF]">
          Select Scheme, Section & Year
        </h2>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {batches.map((item, index) => (
            <div key={index} className="space-y-4">
              <select
                className="w-full p-4 border border-[#A275FF] rounded-xl bg-[#2A1046] text-[#E3D2FF] focus:outline-none focus:ring-2 focus:ring-[#A275FF]"
              >
                <option value="">Select scheme</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
              <select
                className="w-full p-4 border border-[#A275FF] rounded-xl bg-[#2A1046] text-[#E3D2FF] focus:outline-none focus:ring-2 focus:ring-[#A275FF]"
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
              <select
                className="w-full p-4 border border-[#A275FF] rounded-xl bg-[#2A1046] text-[#E3D2FF] focus:outline-none focus:ring-2 focus:ring-[#A275FF]"
              >
                <option value="">Select Year</option>
                <option value="First Year">First Year</option>
                <option value="Second Year">Second Year</option>
                <option value="Third Year">Third Year</option>
                <option value="Final Year">Final Year</option>
              </select>
            </div>
          ))}

          <button
            type="submit"
            className="w-full border border-[#A275FF] text-[#E3D2FF] py-3 rounded-xl text-xl font-bold hover:bg-[#2A1046] transition duration-300"
          >
            Save Selection
          </button>
        </form>
      </div>
    </div>
  );
}
