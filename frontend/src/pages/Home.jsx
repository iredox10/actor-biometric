import faceIO from "@faceio/fiojs";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import img from '../assets/img.jpg'

const Home = () => {
  const navigate = useNavigate();
  const faceio = new faceIO("fioaad72"); // Get the application Public ID at https://console.faceio.net.

  async function authenticateUser() {
    // call to faceio.authenticate() here will automatically trigger the facial authentication process
    try {
      const res = await faceio.authenticate({ locale: "auto" });
      if (res) {
        const staffId = res.payload.fullname;
        console.log(res.payload.staffId);
        navigate(`/staff/${staffId}`);
      }
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="p-10 bg-blue-100 min-h-screen">
      <Header />
      <div className="flex items-center justify-between my-20">
        <div>
          <h1 className=" text-6xl">
            Welcome to
            <span className="block font-bold text-blue-600">
              student attendance
            </span>
            mark your attendance.
          </h1>
          <div className="flex gap-10">
            <button
              className="bg-blue-600 px-4 py-1 my-5 text-xl capitalize font-medium hover:text-white"
              onClick={authenticateUser}>
              student login
            </button>
            <button className="bg-blue-600 px-4 py-1 my-5 text-xl capitalize font-medium hover:text-white">
              <NavLink to='/admin-login'>Admin Login</NavLink>
            </button>
          </div>
        </div>
        <div className="w-[40%]">
          <img src={img} alt="" className="w-full h-full rounded-[100%]" />
        </div>
      </div>
    </div>
  );
};
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
export default Home;
