import { useEffect, useState } from "react";
import "../styles/complaints.css";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

function Complaints() {

  const email = localStorage.getItem("student");

  const [tab, setTab] = useState("add");

  const [category, setCategory] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");

  const [pending, setPending] = useState([]);
  const [working, setWorking] = useState([]);
  const [completed, setCompleted] = useState([]);

  // ---------- LOAD DATA ----------
  useEffect(() => {

    if (!email) return;

    fetch(`${API_URL}/complaint/student/${email}/pending`)
      .then(res => res.json())
      .then(data => setPending(data));

    fetch(`${API_URL}/complaint/student/${email}/working`)
      .then(res => res.json())
      .then(data => setWorking(data));

    fetch(`${API_URL}/complaint/student/${email}/completed`)
      .then(res => res.json())
      .then(data => setCompleted(data));

  }, [tab]);

  // ---------- ADD ----------
  async function addComplaint() {

    if (!category || !issue) {
      alert("Select category and issue");
      return;
    }

    await fetch(`${API_URL}/complaint/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        category,
        issue,
        description
      })
    });

    // alert("Complaint submitted 👍");
    toast.success("Complaint submitted 👍");
    setTab("pending");
  }

  return (
    <div className="complaint-container">

      <h2>Student Complaints</h2>

      {/* -------- TABS -------- */}
      <div className="tabs">
        <button className={tab === "add" ? "active-tab-btn" : ""} onClick={() => setTab("add")}>➕ Add Complaint</button>
        <button className={tab === "pending" ? "active-tab-btn" : ""} onClick={() => setTab("pending")}>🕗 Pending</button>
        <button className={tab === "working" ? "active-tab-btn" : ""} onClick={() => setTab("working")}>🛠 Working</button>
        <button className={tab === "completed" ? "active-tab-btn" : ""} onClick={() => setTab("completed")}>✅ Completed</button>
      </div>

      {/* -------- ADD -------- */}
      {tab === "add" && (
        <div className="card">

          <h3>Add Complaint</h3>

          <select onChange={e => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option>Room</option>
            <option>Bathroom</option>
            <option>Electricity</option>
            <option>Internet</option>
          </select>

          {/* ROOM ISSUES */}
          {category === "Room" && (
            <select onChange={e => setIssue(e.target.value)}>
              <option>Select Issue</option>
              <option>Fan/Light not working</option>
              <option>Plug/Socket issue</option>
              <option>Bed/Bucket/Chair broken</option>
              <option>Room cleaning required</option>
              <option>Water leakage in room</option>
              <option>Window/Door problem</option>
            </select>
          )}

          {/* BATHROOM */}
          {category === "Bathroom" && (
            <select onChange={e => setIssue(e.target.value)}>
              <option>Select Issue</option>
              <option>No water supply</option>
              <option>Flush not working</option>
              <option>Tap leaking</option>
              <option>Bad smell / cleaning required</option>
              <option>Shower not working</option>
            </select>
          )}

          {/* ELECTRICITY */}
          {category === "Electricity" && (
            <select onChange={e => setIssue(e.target.value)}>
              <option>Select Issue</option>
              <option>Power cut</option>
              <option>Low voltage issue</option>
              <option>Switchboard damaged</option>
              <option>AC not working</option>
            </select>
          )}

          {/* INTERNET */}
          {category === "Internet" && (
            <select onChange={e => setIssue(e.target.value)}>
              <option>Select Issue</option>
              <option>No internet connection</option>
              <option>Slow speed</option>
              <option>Login issue</option>
            </select>
          )}

          <textarea
            placeholder="Explain briefly (optional)"
            onChange={e => setDescription(e.target.value)}
          />

          <button className="submit-btn" onClick={addComplaint}>Submit Complaint</button>

        </div>
      )}

      {/* -------- PENDING -------- */}
      {tab === "pending" && (
        <>
          <h3>Pending Complaints</h3>

          {pending.length === 0 && <p>No pending complaints</p>}

          {pending.map(c => (
            <div className="card" key={c._id}>
              <b>{c.category}</b> — {c.issue}
              <p>{c.description}</p>
              <span className="status-chip pending">Pending</span>
            </div>
          ))}
        </>
      )}

      {/* -------- WORKING -------- */}
      {tab === "working" && (
        <>
          <h3>Currently Working</h3>

          {working.length === 0 && <p>No working complaints</p>}

          {working.map(c => (
            <div className="card" key={c._id}>
              <b>{c.category}</b> — {c.issue}
              <p>{c.description}</p>

              <span className="status-chip working">Working</span>

              <button
                className="solve-btn"
                onClick={async () => {
                  await fetch(`${API_URL}/complaint/student-complete/${c._id}`, {
                    method: "POST"
                  });
                  // alert("Marked completed");
                  toast.success("Marked completed");
                  setTab("completed");
                }}
              >
                ✔ Problem Solved
              </button>
            </div>
          ))}
        </>
      )}

      {/* -------- COMPLETED -------- */}
      {tab === "completed" && (
        <>
          <h3>Completed Complaints</h3>

          {completed.length === 0 && <p>No completed complaints</p>}

          {completed.map(c => (
            <div className="card" key={c._id}>
              <b>{c.category}</b> — {c.issue}
              <p>{c.description}</p>
              <span className="status-chip completed">Completed</span>
            </div>
          ))}
        </>
      )}

    </div>
  );
}

export default Complaints;
