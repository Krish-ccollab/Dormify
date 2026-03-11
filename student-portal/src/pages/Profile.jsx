import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/profile.css";
const API_URL = import.meta.env.VITE_API_URL;

function Profile() {

  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const email = localStorage.getItem("student");

    if (!email) {
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/student/${email}`)
      .then(res => res.json())
      .then(data => setStudent(data));

  }, []);

  if (!student) return <h3 className="profile-loading">Loading...</h3>;

  const d = student.details || {};

  return (
    <>
      {/* <Navbar /> */}

      <div className="profile-container">

        {/* TOP CARD */}
        <div className="profile-header">

          <img
            className="profile-big-photo"
            src={
              student.photo
                ? `${API_URL}/uploads/${student.photo}`
                : "https://i.ibb.co/2kR5zq0/default-avatar.png"
            }
            alt="profile"
          />

          <div>
            <h2>{d.studentName}</h2>
            <p>{student.email}</p>

            <div className="profile-badges">
              <span>📱 {d.mobile1}</span>
              <span>🆔 Aadhar: {d.aadhar || "—"}</span>
            </div>
          </div>
        </div>

        {/* SECTIONS GRID */}
        <div className="profile-grid">

          <div className="profile-card">
            <h3>🏫 Institute</h3>
            <p><b>Name:</b> {d.instituteName}</p>
            <p><b>Address:</b> {d.instituteAddress}</p>
          </div>

          <div className="profile-card">
            <h3>🧍 Personal</h3>
            <p><b>Gender:</b> {d.gender}</p>
            <p><b>DOB:</b> {d.dob}</p>
            <p><b>City:</b> {d.city}</p>
            <p><b>Address:</b> {d.address}</p>
          </div>

          <div className="profile-card">
            <h3>👨‍👩‍👦 Parents</h3>
            <p><b>Father:</b> {d.fatherName}</p>
            <p><b>Phone:</b> {d.fatherPhone}</p>
            <p><b>Email:</b> {d.fatherEmail || "—"}</p>
          </div>

          <div className="profile-card">
            <h3>🚨 Emergency</h3>
            <p><b>Name:</b> {d.emergencyName}</p>
            <p><b>Relation:</b> {d.emergencyRelation}</p>
            <p><b>Phone:</b> {d.emergencyPhone}</p>
          </div>

          <div className="profile-card">
            <h3>🛏 Hostel Room</h3>
            <p><b>Floor:</b> {student.floor || "Not Allotted"}</p>
            <p><b>Room:</b> {student.room || "Not Allotted"}</p>
            <p><b>Bed:</b> {student.bed || "Not Allotted"}</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Profile;
