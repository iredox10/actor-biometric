import {useFetcher, useParams} from 'react-router-dom'
import Header from '../components/Header'
import Usefetch from '../hooks/Usefetch'

const StaffStats = () => {
    const {staffId} = useParams()
    const {
      data: staff,
    } = Usefetch(`http://localhost:3001/api/get-staff/${staffId}`);
    console.log(staff)
    const {data:staffDays,loading,err} = Usefetch(`http://localhost:3001/api/staff/${staffId}/attendance/days`)
    const {
      data: staffWeeks,
      loading:wl,
      err:werr,
    } = Usefetch(`http://localhost:3001/api/staff/${staffId}/attendance/weeks`);
    const {
      data: staffMonths,
      loading:ml,
      err:merr,
    } = Usefetch(`http://localhost:3001/api/staff/${staffId}/attendance/months`);


  return (
    <div className="bg-blue-100 p-10 min-h-screen">
      <Header />
      <h1 className='capitalize'>{staff && staff.fullname} attendance detail</h1>
      <div className="flex gap-10 my-10">
        <div>
          <h1 className='capitalize mb-2'>{staff && staff.fullname} today attendance</h1>
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="border border-black">date</th>
                <th className="border border-black">status</th>
              </tr>
            </thead>
            {staffDays &&
              staffDays.attendance.map((atd) => (
                <tbody key={atd._id}>
                  <tr>
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
        </div>

        <div>
          <h1 className='capitalize mb-2'>{staff && staff.fullname} weekly attendance</h1>
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="border border-black">date</th>
                <th className="border border-black">status</th>
              </tr>
            </thead>
            {staffWeeks &&
              staffWeeks.attendance.map((atd) => (
                <tbody key={atd._id}>
                  <tr>
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
        </div>

        <div>
          <h1 className='capitalize mb-2'>{staff && staff.fullname} monthly attendance</h1>
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="border border-black">date</th>
                <th className="border border-black">status</th>
              </tr>
            </thead>
            {staffMonths &&
              staffMonths.attendance.map((atd) => (
                <tbody key={atd._id}>
                  <tr>
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
        </div>
      </div>
    </div>
  );
}

export default StaffStats