import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const backendurl = import.meta.env.VITE_BACKEND_URL;
export default function FacultyLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseData, setResponseData] = useState({
    department: "",
    email: "",
    faculty_id: null,
    first_name: "",
    last_name: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    setErrorMessage("");

    axios
      .post(`${backendurl}/faculty/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          setResponseData(response.data);
          setLoginSuccess(true);
          const facultyId = response.data.faculty_id;
          navigate("/faculty/${facultyId}/courses", {
            state: { facultyData: response.data },
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorMessage("Incorrect username or password");
        } else {
          setErrorMessage("An error occurred while logging in");
        }
        setLoginSuccess(false);
        console.error(error);
      });
  }

  function handleBackButton() {
    navigate("/");
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Faculty Login</h1>

      <div className="d-flex justify-content-end">
        <button className="btn btn-dark ms-auto" onClick={handleBackButton}>
          Back
        </button>
      </div>

      <form onSubmit={handleLogin} className="mt-4">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
