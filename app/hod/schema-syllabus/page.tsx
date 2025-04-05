"use client";
import { useState, useEffect } from "react";

interface CourseMap {
  schemaType: string;
  semester: string;
  courses: string[];
}

interface CourseDetail {
  name: string;
  code: string;
  credit: number;
  instructor: string;
}

const predefinedCourses: Record<string, CourseDetail[]> = {
  R2021: [
    { name: "Mathematics I", code: "MATH101", credit: 4, instructor: "TBA" },
    { name: "Engineering Physics", code: "PHY101", credit: 3, instructor: "TBA" },
    { name: "Programming Basics", code: "CS101", credit: 4, instructor: "TBA" },
  ],
  R2017: [
    { name: "Calculus", code: "MATH201", credit: 3, instructor: "TBA" },
    { name: "Mechanics", code: "MECH101", credit: 3, instructor: "TBA" },
    { name: "C Programming", code: "CS102", credit: 4, instructor: "TBA" },
  ],
  Autonomous: [
    { name: "Design Thinking", code: "DT101", credit: 2, instructor: "TBA" },
    { name: "Digital Systems", code: "ECE101", credit: 3, instructor: "TBA" },
    { name: "Python Basics", code: "CS103", credit: 4, instructor: "TBA" },
  ],
};

export default function SchemaManager() {
  const [view, setView] = useState<"schema" | "course">("schema");

  const [schemaType, setSchemaType] = useState("");
  const [semester, setSemester] = useState("");
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [courseMappings, setCourseMappings] = useState<CourseMap[]>([]);
  const [courseList, setCourseList] = useState<CourseDetail[]>([]);

  const [newCourse, setNewCourse] = useState<CourseDetail>({
    name: "",
    code: "",
    credit: 0,
    instructor: "",
  });

  const allCourses = courseList.map((c) => c.name);
  const usedCourses = courseMappings.flatMap((map) => map.courses);
  const availableCourses = allCourses.filter((course) => !usedCourses.includes(course));

  useEffect(() => {
    if (schemaType && courseList.length === 0 && predefinedCourses[schemaType]) {
      setCourseList(predefinedCourses[schemaType]);
    }
  }, [schemaType]);

  const handleCourseToggle = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  const handleSemSubmit = () => {
    if (schemaType && semester) {
      setShowCourseForm(true);
    }
  };

  const handleAddSemesterCourses = () => {
    if (semester && selectedCourses.length > 0 && schemaType) {
      setCourseMappings((prev) => [
        ...prev,
        { schemaType, semester, courses: selectedCourses }
      ]);
      setSemester("");
      setSelectedCourses([]);
      setShowCourseForm(false);
    }
  };

  const handleAddCourse = () => {
    if (newCourse.credit < 0) {
      alert("Credit cannot be negative.");
      return;
    }
    setCourseList((prev) => [...prev, newCourse]);
    setNewCourse({ name: "", code: "", credit: 0, instructor: "" });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#120C1C] via-[#1F142B] to-[#0A0710] text-[#EADCF9] font-serif">
      <aside className="w-64 bg-[#1D1529] border-r border-[#9B72CF] p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        <div className="space-y-4">
          <button
            className={`w-full py-2 px-4 rounded-xl font-semibold transition ${
              view === "schema"
                ? "bg-[#9B72CF] text-[#1D1529]"
                : "bg-[#2B1F3A] hover:bg-[#4D3A74]"
            }`}
            onClick={() => setView("schema")}
          >
            Schema
          </button>
          <button
            className={`w-full py-2 px-4 rounded-xl font-semibold transition ${
              view === "course"
                ? "bg-[#9B72CF] text-[#1D1529]"
                : "bg-[#2B1F3A] hover:bg-[#4D3A74]"
            }`}
            onClick={() => setView("course")}
          >
            Course
          </button>
        </div>
      </aside>

      <div className="flex-1 p-10 overflow-y-auto">
        {view === "schema" && (
          <div>
            <h2 className="text-4xl font-extrabold text-center mb-8">Schema & Semester Mapping</h2>

            {courseMappings.length > 0 && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4 text-center">Mapped Courses by Schema</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from(new Set(courseMappings.map(m => m.schemaType))).map((schema) => (
                    <div key={schema} className="bg-[#2B1F3A] border border-[#9B72CF] rounded-xl p-6">
                      <h4 className="text-xl font-bold text-purple-300 mb-3 text-center">{schema}</h4>
                      {courseMappings
                        .filter(m => m.schemaType === schema)
                        .map((map, index) => (
                          <div key={index} className="mb-4">
                            <h5 className="text-lg font-semibold mb-2">{map.semester}</h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {map.courses.map((course, idx) => (
                                <div key={idx} className="bg-[#4D3A74] p-3 rounded-xl shadow border border-[#BFA4F2]">
                                  {course}
                                </div>
                              ))}
                            </div>
                          </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block mb-2 font-semibold">Select Schema Type:</label>
              <select
                value={schemaType}
                onChange={(e) => {
                  setSchemaType(e.target.value);
                  setCourseList([]);
                }}
                className="w-full p-3 rounded-lg bg-[#2B1F3A] border border-[#9B72CF]"
              >
                <option value="">-- Choose Schema --</option>
                <option value="R2021">R2021</option>
                <option value="R2017">R2017</option>
                <option value="Autonomous">Autonomous</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold">Enter Semester:</label>
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="e.g. Semester 3"
                className="w-full p-3 rounded-lg bg-[#2B1F3A] border border-[#9B72CF]"
              />
            </div>

            <button
              onClick={handleSemSubmit}
              className="bg-[#9B72CF] hover:bg-[#BFA4F2] text-[#1D1529] py-2 px-6 rounded-xl mb-6"
            >
              Proceed
            </button>

            {showCourseForm && (
              <>
                <h3 className="text-2xl font-bold mb-4">Select Courses for {semester}:</h3>
                {availableCourses.length === 0 ? (
                  <p className="text-red-400">All courses assigned. Please add new ones.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {availableCourses.map((course) => (
                      <label
                        key={course}
                        className="bg-[#2B1F3A] p-3 rounded-xl flex items-center space-x-3 border border-[#9B72CF]"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCourses.includes(course)}
                          onChange={() => handleCourseToggle(course)}
                          className="accent-purple-600"
                        />
                        <span>{course}</span>
                      </label>
                    ))}
                  </div>
                )}
                <button
                  onClick={handleAddSemesterCourses}
                  disabled={selectedCourses.length === 0}
                  className="bg-[#4D3A74] hover:bg-[#9B72CF] text-white py-2 px-6 rounded-xl disabled:opacity-50"
                >
                  Add Semester Courses
                </button>
              </>
            )}
          </div>
        )}

        {view === "course" && (
          <div>
            <h2 className="text-4xl font-extrabold text-center mb-8">Add New Course</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                placeholder="Course Name"
                className="p-3 bg-[#2B1F3A] border border-[#9B72CF] rounded-xl"
              />
              <input
                type="text"
                value={newCourse.code}
                onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                placeholder="Course Code"
                className="p-3 bg-[#2B1F3A] border border-[#9B72CF] rounded-xl"
              />
              <input
                type="number"
                min="0"
                value={newCourse.credit}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, credit: Math.max(0, +e.target.value) })
                }
                placeholder="Credit"
                className="p-3 bg-[#2B1F3A] border border-[#9B72CF] rounded-xl"
              />
              <input
                type="text"
                value={newCourse.instructor}
                onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                placeholder="Instructor Name"
                className="p-3 bg-[#2B1F3A] border border-[#9B72CF] rounded-xl"
              />
            </div>
            <button
              onClick={handleAddCourse}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl mb-8"
            >
              Add Course
            </button>

            <h3 className="text-2xl font-bold mb-4">All Courses</h3>
            {courseList.length === 0 ? (
              <p>No courses added yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courseList.map((course, index) => (
                  <div key={index} className="bg-[#3B2F4D] p-4 rounded-xl border border-[#9B72CF]">
                    <p><strong>Name:</strong> {course.name}</p>
                    <p><strong>Code:</strong> {course.code}</p>
                    <p><strong>Credit:</strong> {course.credit}</p>
                    <p><strong>Instructor:</strong> {course.instructor}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}