import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ErrorMsg from "../components/ErrorMsg";
const Staff = () => {
  const { staffId } = useParams();
  console.log(staffId)
  const [staff, setStaff] = useState({});
  const [status, setStatus] = useState('present')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const res = await axios(`http://localhost:3001/api/staff/${staffId}`);
      console.log(res.data.attendance);
     res && setStaff(res.data);
    };
    fetch();
  }, [staffId]);
  
  console.log(staff)

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      const res = await axios.patch(
        `http://localhost:3001/api/attendance/${staffId}`,
        { status }
      );
      console.log(res.data)
    } catch (err) {
      setErrMsg(err.response.data.message);
      console.log()
    }
  }

  return (
    <div className="p-10 bg-blue-100 min-h-screen">
      <Header />

      {staff && (
        <div className="my-5">
          <p className="capitalize font-bold text-xl">
            welcome back
            <span className="text-blue-600"> {staff.fullname} </span>
          </p>
        </div>
      )}
      <div className="flex gap-36">
        <table className="capitalize table-fixed w-full border-collapse">
          <thead>
            <tr className=" border">
              <th className="border border-black">
                date</th>
              <th className="border border-black">status</th>
            </tr>
          </thead>
          {staff &&
            staff.attendance &&
            staff.attendance.map((atd) => (
              <tbody key={atd._id}>
                <tr className="">
                  <td className="border border-black text-center">
                    {atd.date.split(":")[0]}
                  </td>
                  <td className="border border-black text-center">
                    {atd.status}
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
        <form onSubmit={handleSubmit}>
          {errMsg ? <ErrorMsg err={errMsg} /> : ""}
          <div>
            <label htmlFor="attendance">attendance</label>
            <input
              type="text"
              value={"present"}
              className="border-2 p-2"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div>
            <button className="bg-green-500 p-2" type="submit">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Staff;
