import React, { useState } from 'react'
import Header from '../components/Header'
import { FormInput } from '../components/FormInput'

import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios'
import ErrorMsg from '../components/ErrorMsg'
const AdminLogin = () => {

    const [fullname, setFullname] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!fullname || !password){
            setErrMsg('both field can\'t be empty !!')
            return
        }
        try {
            const res = await axios.post("http://localhost:3001/api/login", {
              fullname,
              password,
            });
            console.log(res.data)
            if(res.data.admin){
                navigate('/admin')
            }else{
                setErrMsg('only admin can login from here')
            }
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <div className="p-10 bg-blue-100 min-h-screen">
      <Header />
      <div className='w-1/2 mx-auto my-16'>
        <h1 className='my-5 capitalize text-2xl font-bold'>admin login</h1>
        <form onSubmit={handleSubmit} className='w-full'>
            {errMsg ? <ErrorMsg err={errMsg} />: ''} 
          <FormInput
            label={"Fullname"}
            labelFor={"fullname"}   
            type={"text"}
            onchange={(e) => setFullname(e.target.value)}
          />
          <FormInput
            label={"password"}
            labelFor={"password"}
            type={"password"}
            onchange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-600 px-4 py-1 my-5 text-xl capitalize font-medium hover:text-white"
            type='submit'>
            login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin