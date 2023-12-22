const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost/attendance_app");

const attendanceSchema = new mongoose.Schema({
  studentId: String,
  fingerprintData: String,
  date: { type: Date, default: Date.now },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

// Routes
app.post("/api/attendance", async (req, res) => {
  try {
    const { studentId, fingerprintData } = req.body;
    const attendance = new Attendance({ studentId, fingerprintData });
    await attendance.save();
    res.json({ success: true, message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
