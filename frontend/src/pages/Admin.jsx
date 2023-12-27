import faceIO from "@faceio/fiojs";
import { FormInput } from '../components/FormInput'
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ErrorMsg from "../components/ErrorMsg";
import Usefetch from "../hooks/Usefetch";
const faceio = new faceIO("fioaad72"); // Get the application Public ID at https://console.faceio.net.

function Admin() {
  const [fullname, setFullname] = useState("");
  const [staffId, setStaffId] = useState("");
  const [department, setDepartment] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const {
    data: staffs,
    loading,
    err,
  } = Usefetch("http://localhost:3001/api/get-staffs");
console.log(staffs)
  async function enrollNewUser() {
    if (!fullname || !staffId || !department) {
      setErrMsg("please fill of the fields");
      return;
    }
    const res = await axios.post("http://localhost:3001/api/register", {
      fullname,
      staffId,
      department,
    });

    if (res.status !== 201) {
      console.log(res.data, res);
      setErrMsg(res.data);
      return;
    } else {
      console.log(res.data);
      enrollFace();
    }
  }
  // call to faceio.enroll() here will automatically trigger the on-boarding process
  const enrollFace = async () => {
    try {
      const faceResponse = await faceio.enroll({
        locale: "auto",
        payload: {
          fullname,
          staffId,
          department,
        },
      });
      console.log(faceResponse);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="p-10 bg-blue-100 min-h-screen">
      <Header />
      <div className="flex gap-32">
        <div className="my-5 w-full">
          <h1 className="text-3xl font-bold capitalize my-2">
            register <span className=" text-blue-600"> new staff </span>
          </h1>
          {errMsg ? <ErrorMsg err={errMsg} /> : ""}
          <FormInput
            type={"text"}
            labelFor={"fullname"}
            label={"fullname"}
            onchange={(e) => setFullname(e.target.value)}
          />
          <FormInput
            type={"text"}
            labelFor={"staffId"}
            label={"staff Id"}
            onchange={(e) => setStaffId(e.target.value)}
          />
          <div className="my-2 ">
            <label htmlFor="department">department</label>
            <select
              name="department"
              id="department"
              onChange={(e) => setDepartment(e.target.value)}
              className="bg-white w-full p-2 capitalize">
              <option value="computer science">computer science</option>
              <option value="physics">physic</option>
            </select>
          </div>

          <button
            className="bg-blue-600 my-5 px-4 py-1 text-xl font-medium hover:text-white capitalize mr-3"
            onClick={enrollNewUser}>
            Register staff
          </button>
        </div>
        <div className="w-full my-5">
          <h1 className="capitalize font-bold text-2xl mb-3">list of staffs</h1>

          <table className="table-fixed w-full border border-black border-collapse">
            <thead>
              <tr>
                <th className="border border-black">Fullname</th>
                <th className="border border-black">Staff Id</th>
                <th className="border border-black">Department</th>
              </tr>
            </thead>
            {staffs &&
              staffs.map((staff) => (
                <tbody key={staff._id}>
                  <tr>
                    <td className="border border-black text-center">
                      <NavLink to={`/staff-stats/${staff.staffId}`}>
                        {" "}
                        {!staff.admin ? staff.fullname : null}
                      </NavLink>
                    </td>
                    <td className="border border-black text-center">
                      {!staff.admin ? staff.staffId : null}
                    </td>
                    <td className="border border-black text-center">
                      {!staff.admin ? staff.department : null}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
          <NavLink to="/admin-stats">view stats</NavLink>
        </div>
      </div>
    </div>
  );
}

function handleError(errCode) {
  // Handle error here
  // Log all possible error codes during user interaction..
  // Refer to: https://faceio.net/integration-guide#error-codes
  // for a detailed overview when these errors are triggered.
  const fioErrs = faceio.fetchAllErrorCodes();
  switch (errCode) {
    case fioErrs.PERMISSION_REFUSED:
      console.log("Access to the Camera stream was denied by the end user");
      break;
    case fioErrs.NO_FACES_DETECTED:
      console.log(
        "No faces were detected during the enroll or authentication process"
      );
      break;
    case fioErrs.UNRECOGNIZED_FACE:
      console.log("Unrecognized face on this application's Facial Index");
      break;
    case fioErrs.MANY_FACES:
      console.log("Two or more faces were detected during the scan process");
      break;
    case fioErrs.FACE_DUPLICATION:
      console.log(
        "User enrolled previously (facial features already recorded). Cannot enroll again!"
      );
      break;
    case fioErrs.MINORS_NOT_ALLOWED:
      console.log("Minors are not allowed to enroll on this application!");
      break;
    case fioErrs.PAD_ATTACK:
      console.log(
        "Presentation (Spoof) Attack (PAD) detected during the scan process"
      );
      break;
    case fioErrs.FACE_MISMATCH:
      console.log(
        "Calculated Facial Vectors of the user being enrolled do not matches"
      );
      break;
    case fioErrs.WRONG_PIN_CODE:
      console.log("Wrong PIN code supplied by the user being authenticated");
      break;
    // ...
    // Refer to the boilerplate at: https://gist.github.com/symisc/34203d2811a39f2a871373abc6dd1ce9
    // for the list of all possible error codes.
  }
}

export default Admin;
