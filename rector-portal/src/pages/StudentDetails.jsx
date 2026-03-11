// Assignt the room page acept and rejct 

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import "../styles/studentDetails.css"
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

function StudentDetails() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [student, setStudent] = useState(null)

    const [floor, setFloor] = useState("")
    const [room, setRoom] = useState("")
    const [bed, setBed] = useState("")

    useEffect(() => {
        fetch(`${API_URL}/rector/pending-students`)
            .then(res => res.json())
            .then(data => {
                const found = data.find(s => s._id === id)
                setStudent(found)
            })
    }, [])

    async function approve() {
        await fetch(`${API_URL}/rector/approve/${student.email}`, { method: "POST" })
        // alert("Approved ✔")
        toast.success("Approved ✔");
        navigate("/students")
    }

    async function reject() {
        await fetch(`${API_URL}/rector/reject/${student.email}`, { method: "POST" })
        // alert("Rejected ❌")
        toast.success("Rejected ❌");
        navigate("/students")
    }

    async function assignRoom() {

        const res = await fetch(
            `${API_URL}/rector/assign-room/${student.email}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ floor, room, bed })
            }
        )

        const data = await res.json()

        if (!res.ok) {
            alert(data.detail)
            return
        }

        // alert("Room Assigned Successfully 🎉")
        toast.success("Room Assigned Successfully 🎉");
    }

    if (!student) return <h3 className="loading">Loading…</h3>

    const d = student.details

    return (
        <>
            <Navbar />

            <div className="details-wrapper">

                {/* LEFT PROFILE CARD */}
                <div className="left-profile-card">

                    <img
                        src={
                            student.photo
                                ? `${API_URL}/uploads/${student.photo}`
                                : "https://i.ibb.co/2kR5zq0/default-avatar.png"
                        }
                        alt="profile"
                    />

                    <h2>{d.studentName}</h2>
                    <p>📧 {student.email}</p>
                    <p>📞 {d.mobile1}</p>

                    <div className="mini-tags">
                        <span>{d.gender}</span>
                        <span>{d.dob}</span>
                    </div>

                </div>

                {/* RIGHT BIG DETAILS CARD */}
                <div className="right-details-card">

                    <h2>Student Full Details</h2>

                    <div className="grid-two">

                        <div>
                            <h3>🏫 Institute Info</h3>
                            <p><b>Title:</b> {d.title}</p>
                            <p><b>Name:</b> {d.instituteName}</p>
                            <p><b>Address:</b> {d.instituteAddress}</p>
                        </div>

                        <div>
                            <h3>👪 Parent Info</h3>
                            <p><b>Father:</b> {d.fatherName}</p>
                            <p><b>Phone:</b> {d.fatherPhone}</p>
                        </div>

                        <div>
                            <h3>🚨 Emergency</h3>
                            <p><b>Name:</b> {d.emergencyName}</p>
                            <p><b>Phone:</b> {d.emergencyPhone}</p>
                        </div>

                        <div>
                            <h3>📍 Address</h3>
                            <p>{d.address}</p>
                            <p>{d.city}</p>
                        </div>

                    </div>

                    <hr />

                    {/* ASSIGN ROOM */}
                    <h3>🛏 Assign Room</h3>

                    <div className="assign-room">

                        <input placeholder="Floor" onChange={e => setFloor(e.target.value)} />
                        <input placeholder="Room" onChange={e => setRoom(e.target.value)} />
                        <input placeholder="Bed" onChange={e => setBed(e.target.value)} />

                        <button className="primary" onClick={assignRoom}>
                            Assign Room
                        </button>
                    </div>

                    <div className="action-btns">
                        <button className="approve" onClick={approve}>✔ Approve</button>
                        <button className="reject" onClick={reject}>✖ Reject</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default StudentDetails
