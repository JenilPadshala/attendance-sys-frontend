import React from "react";
import { useLocation } from "react-router-dom";
import StudentNavbar from "../components/StudentNavbar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import AttendanceTable from "../components/AttendanceTable";
// const backendurl = import.meta.env.VITE_BACKEND_URL;
const backendurl = "http://40.81.224.158:8000";
export default function StudentAttendance() {
  const location = useLocation();
  const { studentData } = location.state || {};
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    //Fetch attendance data for the student from the backend
    const fetchAttendance = async () => {
      axios
        .get(`${backendurl}/student/${studentData.student_id}/attendance`)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setAttendanceData(response.data);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchAttendance();
  }, []);

  return (
    <div>
      <StudentNavbar studentData={studentData} />
      <div className="container mt-5">
        <h1>Attendance Details</h1>
        <br />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Course Title</th>
              <th scope="col">Attendance Percentage</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((attendance, index) => (
              <AttendanceTable
                key={index}
                course_name={attendance.course_name}
                percentage={attendance.attendance_percentage}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
