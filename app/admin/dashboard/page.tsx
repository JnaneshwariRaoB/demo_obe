"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [departments, setDepartments] = useState<{ code: string; name: string }[]>([]);
  const [newDepartment, setNewDepartment] = useState({ code: "", name: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editDept, setEditDept] = useState({ code: "", name: "" });
  const router = useRouter();

  const addDepartment = () => {
    if (
      newDepartment.name.trim() &&
      newDepartment.code.trim() &&
      !departments.some((dept) => dept.name === newDepartment.name.toUpperCase())
    ) {
      setDepartments([
        ...departments,
        { code: newDepartment.code.toUpperCase(), name: newDepartment.name.toUpperCase() },
      ]);
      alert("Saved!");
      setNewDepartment({ code: "", name: "" });
    }
  };

  const goToDepartmentSelection = (deptName?: string) => {
    if (deptName) {
      router.push(`/admin/program?dept=${encodeURIComponent(deptName)}`);
    } else {
      router.push("/admin/program");
    }
  };

  const startEdit = (index: number) => {
    setEditIndex(index);
    setEditDept(departments[index]);
  };

  const saveEdit = () => {
    if (!editDept.name.trim() || !editDept.code.trim()) return;

    const updated = [...departments];
    updated[editIndex!] = {
      code: editDept.code.toUpperCase(),
      name: editDept.name.toUpperCase(),
    };
    setDepartments(updated);
    setEditIndex(null);
    setEditDept({ code: "", name: "" });
  };

  return (
    <>
      {/* Image Logo Header */}
      <div className="w-full bg-white flex justify-center items-center">
  <img
    src="https://sijr.sahyadri.edu.in/images/logo.png"
    alt="Sahyadri Logo Banner"
    className="w-full h-40 object-contain"
  />
</div>

      {/* Main Dashboard */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#2C2233] to-[#3F2D47] p-8 font-serif text-white font-bold">
        <div className="w-full max-w-5xl bg-[#4B3B5C] p-8 rounded-3xl shadow-2xl border-4 border-[#A786DF]">
          <h2 className="text-4xl text-center mb-10 text-white font-bold">Admin Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Departments List */}
            <div className="bg-[#3F3147] p-6 rounded-xl shadow-md border border-[#9C88B8]">
              <h3 className="text-2xl text-center mb-4">Departments</h3>
              {departments.length > 0 ? (
                <ul className="space-y-4 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-[#9C88B8] scrollbar-track-transparent">
                  {departments.map((dept, index) => (
                    <li
                      key={index}
                      className="p-4 bg-[#5A476D] rounded-lg border border-[#8C7BAF] hover:bg-[#6A5985] transition"
                    >
                      {editIndex === index ? (
                        <div className="flex flex-col gap-2">
                          <input
                            type="text"
                            value={editDept.code}
                            onChange={(e) => setEditDept({ ...editDept, code: e.target.value })}
                            className="px-2 py-1 rounded bg-[#6A5985] text-white border border-[#9C88B8] placeholder-white"
                            placeholder="Code"
                          />
                          <input
                            type="text"
                            value={editDept.name}
                            onChange={(e) => setEditDept({ ...editDept, name: e.target.value })}
                            className="px-2 py-1 rounded bg-[#6A5985] text-white border border-[#9C88B8] placeholder-white"
                            placeholder="Name"
                          />
                          <button
                            onClick={saveEdit}
                            className="bg-gradient-to-r from-[#A786DF] to-[#6A4C93] py-1 px-3 rounded-lg hover:from-[#5D4A75] hover:to-[#9370DB] text-white"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => goToDepartmentSelection(dept.name)}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <span>
                            <span className="font-bold">{dept.code}</span> - {dept.name}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEdit(index);
                            }}
                            className="text-sm bg-[#A786DF] text-white px-2 py-1 rounded hover:bg-[#9370DB]"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">No departments added</p>
              )}
            </div>

            {/* Add New Department */}
            <div className="bg-[#3F3147] p-6 rounded-xl shadow-md border border-[#9C88B8]">
              <h3 className="text-2xl text-center mb-4">Add Department</h3>
              <input
                type="text"
                placeholder="Department Code"
                value={newDepartment.code}
                onChange={(e) =>
                  setNewDepartment({ ...newDepartment, code: e.target.value.toUpperCase() })
                }
                className="w-full p-3 mb-3 rounded-xl border border-[#9C88B8] bg-[#5A476D] text-white placeholder-white focus:ring-2 focus:ring-[#A786DF] focus:outline-none shadow-sm"
              />
              <input
                type="text"
                placeholder="Department Name"
                value={newDepartment.name}
                onChange={(e) =>
                  setNewDepartment({ ...newDepartment, name: e.target.value.toUpperCase() })
                }
                className="w-full p-3 rounded-xl border border-[#9C88B8] bg-[#5A476D] text-white placeholder-white focus:ring-2 focus:ring-[#A786DF] focus:outline-none shadow-sm"
              />
              <button
                onClick={addDepartment}
                className="w-full mt-4 py-2 bg-gradient-to-r from-[#A786DF] to-[#6A4C93] text-white rounded-xl hover:from-[#5D4A75] hover:to-[#9370DB] transition shadow-md"
              >
                Save
              </button>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={() => goToDepartmentSelection()}
            className="w-full mt-10 py-3 bg-[#6A4C93] text-white rounded-xl hover:bg-[#5D4A75] transition duration-300 shadow-md"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
