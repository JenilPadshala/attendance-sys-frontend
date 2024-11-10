// src/Home.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendurl = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios
      .get(`${backendurl}/`)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage("Error fetching message");
        console.error(error);
      });
  }, []);

  const navigate = useNavigate();

  const handleFacultyLogin = () => {
    navigate("/faculty/login");
  };

  const handleStudentLogin = () => {
    navigate("/student/login");
  };

  return (
    <div className="container text-center mt-5">
      <h1 id="welcm" className="text-white text-shadow">{message}</h1>
      

      <div className="mt-4">
        <button  className="btn btn-warning m-2 btn-lg fw-bold" onClick={handleFacultyLogin}>
          Faculty Login
        </button>
        <button  className="btn btn-success m-2 btn-lg fw-bold" onClick={handleStudentLogin}>
          Student Login
        </button>
      </div>
    </div>
  );
};

export default Home;
