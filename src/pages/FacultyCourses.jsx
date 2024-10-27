import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Courses from "../components/Courses";
import FacultyNavbar from "../components/FacultyNavbar";

const backendurl = import.meta.env.VITE_BACKEND_URL;
export default function FacultyCourses() {
  const [courses, setCourses] = useState([]);
  // Retrieve state passed from the FacultyLogin component
  const location = useLocation();
  const { facultyData } = location.state; // Destructure facultyData from state
  useEffect(() => {
    //Fetch courses taught by the faculty from the backend
    const fetchCourses = async () => {
      axios
        .get(`${backendurl}/faculty/${facultyData.faculty_id}/courses`)
        .then((response) => {
          if (response.status === 200) {
            setCourses(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchCourses();
  }, []);
  return (
    <div>
      <FacultyNavbar facultyData={facultyData} />
      <div className="container mt-5">
        <h1>Department: {facultyData.department}</h1>
        <br />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Course Code</th>
              <th scope="col">Course Title</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <Courses key={index} course={course} facultyData={facultyData} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
