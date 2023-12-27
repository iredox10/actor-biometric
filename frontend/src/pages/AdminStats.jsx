import React from 'react'
import Header from '../components/Header'
import Usefetch from '../hooks/Usefetch'

const AdminStats = () => {
    const {
      data: daysStats,
      loading:dl,
      error:derr,
    } = Usefetch("http://localhost:3001/api/attendance/days");
    const {
      data: weeksStats,
      loading:wl,
      error:werr,
    } = Usefetch("http://localhost:3001/api/attendance/weeks");
    const {
      data: monthsStats,
      loading:ml,
      error:merr,
    } = Usefetch("http://localhost:3001/api/attendance/months");
    // console.log(daysStats && daysStats)
    console.log(monthsStats && monthsStats.map(stat => stat.totalAttendance))
  return (
    <div className="p-10 bg-blue-100 min-h-screen">
      <Header />

      <div>
        <div className="flex gap-10 my-10">
          <div>
            <h1 className="capitalize font-bold">today attendance</h1>
            <table className="table-fix w-full">
              <thead>
                <tr>
                  <th className="border border-black px-2">staffId</th>
                  <th className="border border-black px-2">fullname</th>
                  <th className="border border-black px-2">department</th>
                </tr>
              </thead>
              {daysStats &&
                daysStats.map((atd) => (
                  <tbody key={atd._id}>
                    <tr>
                      <td className="border border-black text-center">
                        {atd._id.staffId}
                      </td>
                      <td className="border border-black text-center">
                        {atd._id.fullname}
                      </td>
                      <td className="border border-black text-center">
                        {atd._id.department}
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>

          <div>
            <h1 className="capitalize font-bold"> weekly attendance</h1>
            <table className="table-fixed w-full">
              <thead>
                <tr>
                  <th className="border border-black px-2">staffId</th>
                  <th className="border border-black px-2">fullname</th>
                  <th className="border border-black px-2">department</th>
                  <th className="border border-black px-2">
                    number of attendance
                  </th>
                </tr>
              </thead>
              {weeksStats &&
                weeksStats.map((atd) => (
                  <tbody key={atd._id}>
                    <tr>
                      <td className="border border-black text-center">
                        {atd._id.staffId}
                      </td>
                      <td className="border border-black text-center">
                        {atd._id.fullname}
                      </td>
                      <td className="border border-black text-center">
                        {atd._id.department}
                      </td>
                      <td className="border border-black text-center">
                        {atd.totalAttendance}
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>

          <div>
            <h1 className="capitalize font-bold">monthly attendance</h1>
            <table className="table-fixed w-full">
              <thead>
                <tr>
                  <th className="border border-black px-2">staffId</th>
                  <th className="border border-black px-2">fullname</th>
                  <th className="border border-black px-2">department</th>
                  <th className="border border-black px-2">
                    number of attendance
                  </th>
                </tr>
              </thead>
              {monthsStats &&
                monthsStats.map((atd) => (
                  <tbody key={atd._id}>
                    <tr>
                      <td className="border border-black text-center">
                        {atd._id.staffId}
                      </td>
                      <td className="border border-black text-center">
                        {atd._id.fullname}
                      </td>
                      <td className="border border-black text-center">
                        {atd._id.department}
                      </td>
                      <td className="border border-black text-center">
                        {atd.totalAttendance}
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStats