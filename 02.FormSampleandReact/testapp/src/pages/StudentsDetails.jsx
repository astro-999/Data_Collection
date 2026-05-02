import axios from "axios";
import React, { useState, useEffect } from "react";
import "../css/StudentsDetails.css";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function StudentsDetails() {
  const [student, setStudent] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDetails, setShowDetails] = useState(false);


  async function fetchStudentDetails(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${API}/api/student/details/${studentId}`
      );
      setStudent(response.data);
      setShowDetails(true);
    } catch (err) {
      setError("Student not found or server error.");
      setStudent(null);
      setShowDetails(false);
    } finally {
      setLoading(false);
    }
  }

  // New: select a student from the list
  async function selectStudent(stu) {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${API}/api/student/details/${stu.stu_id}`
      );
      setStudent(response.data);
      setShowDetails(true);
    } catch (err) {
      setError("Student not found or server error.");
      setStudent(null);
      setShowDetails(false);
    } finally {
      setLoading(false);
    }
  }

  function clearSearch() {
    setStudent(null);
    setStudentId("");
    setError("");
    setShowDetails(false);
  }

  useEffect(() => {
    axios
      .get(`${API}/api/student/list`)
      .then((response) => {
        setAllStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching all students:", error);
      });
  }, []);

  return (
    <div>
      {/* Search */}
      <div className="student-search-container">
        <form onSubmit={fetchStudentDetails}>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Search by name or ID"
          />
          <button type="submit">Search</button>

        </form>
      </div>

      {/* Feedback */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {showDetails && student ? (
        /* ===== Searched Student Details View ===== */
        <>
          <button className="back-btn" onClick={clearSearch}>
            ← Back to List
          </button>

          {/* Single Student Details */}
          <div className="student-details-container">
            <h2>Student Detail</h2>
            <table className="student-details-table">
              <tbody>
                <tr><td>Name</td><td>{student.name}</td></tr>
                <tr><td>Age</td><td>{student.age}</td></tr>
                <tr><td>Student ID</td><td>{student.stu_id}</td></tr>
                <tr><td>Contact</td><td>{student.contact}</td></tr>
                <tr><td>Email</td><td>{student.email}</td></tr>
                <tr><td>Parents' Name</td><td>{student.parents_name}</td></tr>
                <tr><td>Batch</td><td>{student.batch}</td></tr>
                <tr><td>Faculty</td><td>{student.faculty}</td></tr>
              </tbody>
            </table>
          </div>

          {/* Fee Details */}
          <div className="fee-details-header">
            <h1>Student Fee Details</h1>
          </div>
          {student.fees && student.fees.length > 0 ? (
            <div className="fee-details-container">
              <table className="fee-details-table">
                <thead>
                  <tr>
                    <th>Semester</th><th>Fee Amount</th><th>Paid Amount</th>
                    <th>Due Amount</th><th>Payment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {student.fees.map((fee, index) => (
                    <tr key={fee.id || index}>
                      <td>{fee.semester}</td>
                      <td>Rs. {fee.fee_amount}</td>
                      <td>Rs. {fee.payed_amount}</td>
                      <td>Rs. {fee.due_amount}</td>
                      <td>{fee.pay_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No fee details available
            </p>
          )}
        </>
      ) : (
        /* ===== All Students List View (default) ===== */
        <div>
          <h2>Student Details</h2>
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th><th>Age</th><th>ID</th><th>Contact</th>
                <th>Email</th><th>Parents</th><th>Batch</th><th>Faculty</th>
              </tr>
            </thead>
            <tbody>
              {allStudents.map((stu) => (
              <tr key={stu.stu_id} onClick={() => selectStudent(stu)} className="clickable-row">
                <td>{stu.name}</td>
                <td>{stu.age}</td>
                <td>{stu.stu_id}</td>
                <td>{stu.contact}</td>
                <td>{stu.email}</td>
                <td>{stu.parents_name}</td>
                <td>{stu.batch}</td>
                <td>{stu.faculty}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentsDetails;
