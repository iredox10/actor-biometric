import faceIO from "@faceio/fiojs";
import { FormInput } from "./components/FormInput";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import Home  from "./pages/Home";
const faceio = new faceIO("fioaad72"); // Get the application Public ID at https://console.faceio.net.

function App() {
  return(
    <div className="">
      <Home />
    </div>
  )
  }

export default App;
