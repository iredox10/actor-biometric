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
  fullname: {
    type: String,
    required: true,
  },
  staffId: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  password: String,
  attendance: [
    {
      status: { type: String, default: "absense" },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Staff = mongoose.model("Attendance", attendanceSchema);

// Middleware to check if 24 hours have passed since the last attendance update
const checkAttendanceLimit = async (req, res, next) => {
  try {
    const staff = await Staff.findOne({ staffId: req.params.staffId });

    // Check if staff exists and has attended before
    if (staff && staff.attendance.length >0) {
      const lastAttendance = staff.attendance[staff.attendance.length - 1];
      const timeDifference = Date.now() - lastAttendance.date.getTime();
      const hoursDifference = timeDifference / (1000 * 60 * 60);

      // Deny the update if less than 24 hours have passed since the last attendance
      if (hoursDifference < 24) {
        return res.status(429).json({
          success: false,
          message: "Only one attendance update allowed per 24 hours",
        });
      }
    }else{
      return next()
    }

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Routes
app.post("/api/register", async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json(staff);
  } catch (err) {
    if (err.code == 11000) {
      err.message = "staffId already exist";
    }
    res.json(err.message);
  }
});
app.post("/api/attendance", async (req, res) => {
  try {
    const { studentId } = req.body;
    const attendance = new Attendance({ studentId });
    await attendance.save();
    res.json({ success: true, message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/api/staff/:staffId", async (req, res) => {
  try {
    const staff = await Staff.findOne({ staffId: req.params.staffId });
    res.json(staff);
  } catch (err) {
    res.json(err);
  }
});

app.patch(
  "/api/attendance/:staffId",
  checkAttendanceLimit,
  async (req, res) => {
    try {
      const attendance = await Staff.findOneAndUpdate(
        { staffId: req.params.staffId },
        {
          $push: {
            attendance: {
              status: req.body.status, // or any other status you want to update
              date: new Date(), // or the specific date you want to update
            },
          },
        },
        { new: true }
      );
      res.json({ attendance });
    } catch (err) {
      res.json(err.message);
    }
  }
);

app.get("/api/get-staffs", async (req, res) => {
  try {
    const staffs = await Staff.find();
    res.status(200).json(staffs);
  } catch (err) {
    res.status(404).json(err.message);
  }
});

app.get("/api/get-staff/:staffId", async (req, res) => {
  try {
    const staff = await Staff.findOne({staffId: req.params.staffId});
    res.status(200).json(staff);
  } catch (err) {
    res.status(404).json(err.message);
  }
});
app.get("/api/staff/:staffId/attendance/:duration", async (req, res) => {
  try {
    const { staffId, duration } = req.params;
    const staff = await Staff.findOne({ staffId });

    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let startDate;
    switch (duration) {
      case "days":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        break;
      case "weeks":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        startDate.setDate(startDate.getDate() - startDate.getDay());
        break;
      case "months":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        startDate.setDate(1);
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid duration parameter" });
    }

    const filteredAttendance = staff.attendance.filter(
      (entry) => entry.date >= startDate
    );

    res.json({ success: true, attendance: filteredAttendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Route to get overall staff attendance for each day, week, or month
app.get("/api/attendance/:duration", async (req, res) => {
  try {
    const { duration } = req.params;

    let startDate;
    switch (duration) {
      case "days":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        break;
      case "weeks":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        startDate.setDate(startDate.getDate() - startDate.getDay());
        break;
      case "months":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        startDate.setDate(1);
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid duration parameter" });
    }

    const attendance = await Staff.aggregate([
      {
        $unwind: "$attendance",
      },
      {
        $match: {
          "attendance.date": { $gte: startDate },
        },
      },

      {
        $group: {
          _id: {
            staffId: "$staffId",
            fullname: "$fullname",
            department: "$department",
            date: "$date",
            status: "$status",
          },
          totalAttendance: { $sum: 1 },
        },
      },
    ]);

    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const staff = await Staff.findOne({ fullname: req.body.fullname });
    res.status(200).json(staff);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
