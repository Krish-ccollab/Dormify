import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/rectorDashboard.css";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

function RectorDashboard() {

  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/rector/active-students`)
      .then(res => res.json())
      .then(data => setTotalStudents(data.length));
  }, []);

  const rector = {
    name: "Krish Modh",
    phone: "1234567890",
    email: "helllo@gmail.com",
    city: "Surat",
    address: "2, Shiv Vatika, Dindoli, Surat",
    photo: "https://i.ibb.co/2kR5zq0/default-avatar.png"
  };

  return (
    <>
      <Navbar />

      <div className="rector-dashboard">

        {/* LEFT PROFILE CARD */}
        <div className="rector-card profile-card">

          <img src={rector.photo} alt="rector" className="rector-photo" />

          <h2 className="rector-name">{rector.name}</h2>

          <div className="rector-info">
            <p>📞 {rector.phone}</p>
            <p>📧 {rector.email}</p>
            <p>🏙 {rector.city}</p>
            <p>🏠 {rector.address}</p>
          </div>

        </div>

        {/* RIGHT STATS CARD */}
        <div className="rector-card stats-card">

          <h2>Hello Rector 👋</h2>

          <div className="stat-box">
            🧑‍🎓 Total Students in Hostel: <b>{totalStudents}</b>
          </div>

        </div>

      </div>
    </>
  );
}

export default RectorDashboard;
