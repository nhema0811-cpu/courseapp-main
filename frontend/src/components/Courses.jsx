
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCircleUser } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse, FaDownload } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check login
  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token);
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/course/courses`
        );

        console.log("API RESPONSE:", response.data);

        if (response.data && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
        } else {
          setCourses([]);
        }

      } catch (error) {
        console.error("Fetch error:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-3xl text-gray-800"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full bg-gray-100 w-64 p-5 transform transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center mb-10 mt-10 md:mt-0">
          <img src="/logo.webp" alt="Logo" className="rounded-full h-12 w-12" />
        </div>

        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/" className="flex items-center">
                <RiHome2Fill className="mr-2" /> Home
              </Link>
            </li>

            <li className="mb-4 text-blue-600 font-semibold">
              <Link to="/courses" className="flex items-center">
                <FaDiscourse className="mr-2" /> Courses
              </Link>
            </li>

            <li className="mb-4">
              <Link to="/purchases" className="flex items-center">
                <FaDownload className="mr-2" /> Purchases
              </Link>
            </li>

            <li className="mb-4">
              <Link to="/settings" className="flex items-center">
                <IoMdSettings className="mr-2" /> Settings
              </Link>
            </li>

            <li>
              {isLoggedIn ? (
                <Link to="/" className="flex items-center">
                  <IoLogOut className="mr-2" /> Logout
                </Link>
              ) : (
                <Link to="/login" className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-10 md:ml-0">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">Courses</h1>

          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-l-full px-4 py-2 h-10 focus:outline-none"
              />
              <button className="h-10 border border-gray-300 rounded-r-full px-4 flex items-center justify-center">
                <FiSearch className="text-xl text-gray-600" />
              </button>
            </div>

            <FaCircleUser className="text-4xl text-blue-600" />
          </div>
        </header>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-500">No courses available</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={course.image?.url}
                  alt={course.title}
                  className="rounded mb-4 w-full h-40 object-cover"
                />

                <h2 className="font-bold text-lg mb-2">
                  {course.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  {course.description?.length > 100
                    ? course.description.slice(0, 100) + "..."
                    : course.description}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-xl">
                    ₹{course.price}
                  </span>
                </div>

                <Link
                  to={`/buy/${course._id}`}
                  className="bg-orange-500 w-full block text-center text-white px-4 py-2 rounded-lg hover:bg-blue-900 duration-300"
                >
                  Buy Now
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Courses;
