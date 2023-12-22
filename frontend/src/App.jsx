import React, { useState, useEffect } from "react";
import axios from "axios";
import Fingerprint2 from "fingerprintjs2";



function App() {
  const [studentId, setStudentId] = useState("");
  const [fingerprintData, setFingerprintData] = useState("");

  useEffect(() => {
    // Use fingerprintjs2 to capture fingerprint data
    Fingerprint2.get({}, function (components) {
      const fingerprint = Fingerprint2.x64hash128(
        components.map((pair) => pair.value).join(""),
        31
      );
      setFingerprintData(fingerprint);
    });
  }, []);

  const markAttendance = async () => {
    try {
      await axios.post("http://localhost:3001/api/attendance", {
        studentId,
        fingerprintData,
      });
      console.log("Attendance marked successfully");
    } catch (error) {
      console.error("Error marking attendance:", error.message);
    }
  };

  return (
    <div className="App">
      <h1>Fingerprint Attendance App</h1>
      <div>
        <label>Student ID:</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>
      <div>
        <label>Fingerprint Data:</label>
        <input type="text" value={fingerprintData} readOnly />
      </div>
      <button onClick={markAttendance}>Mark Attendance</button>
    </div>
  );
}

export default App;
