import { useLocation } from "react-router-dom";
import FacultyNavbar from "../components/FacultyNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const backendurl = import.meta.env.VITE_BACKEND_URL;
const backendurl = "http://40.81.224.158:8000";

export default function TakeAttendance() {
  const [nfcId, setNfcId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const location = useLocation();
  const { course, facultyData } = location.state;
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(nfcId);
    setNfcId("");

    axios
      .post(
        `${backendurl}/faculty/${facultyData.faculty_id}/${course.course_id}/attendance`,
        {
          nfc_tag_id: nfcId,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setResponseMessage(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.detail);
        } else if (error.response.status === 404) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("An error occurred while taking attendance");
        }
        setLoginSuccess(false);
        console.error(error);
      });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setResponseMessage(null);
    }, 1500); // 1000 milliseconds = 1 second

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [responseMessage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(null);
    }, 1500); // 1000 milliseconds = 1 second

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [errorMessage]);

  function handleFinalizeAttendance() {
    axios
      .post(
        `${backendurl}/faculty/${facultyData.faculty_id}/${course.course_id}/finalize-attendance`,
        {},
        { maxRedirects: 0 }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200 && response.data.redirect_url) {
          alert(
            "Attendance finalized successfully, remaining students have been marked ABSENT!"
          );
          navigate(response.data.redirect_url, {
            state: { facultyData: facultyData },
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <FacultyNavbar facultyData={facultyData} />
      <div className="container text-center mt-5">
        <h1>Course: {course.course_name}</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h2>Enter Attendance</h2>
            <input
              type="text"
              className="form-control"
              id="nfc_id"
              placeholder="NFC ID"
              value={nfcId}
              onChange={(e) => setNfcId(e.target.value)}
            />
          </div>

          {responseMessage && (
            <div className="alert alert-success text-center" role="alert">
              {responseMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <br />
        <button
          className="btn btn-success btn-lg"
          onClick={handleFinalizeAttendance}
        >
          Finalize Attendance
        </button>
        {/* <br /> */}
        {/* <h2>Students marked Present:</h2> */}
      </div>
    </div>
  );
}
