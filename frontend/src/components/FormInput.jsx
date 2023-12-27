import React from 'react'

export const FormInput = ({type, labelFor,label, onchange}) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={labelFor}>{label}</label>
      <input type={type} name="" id="" className='border p-1' onChange={onchange}/>
    </div>
  );
}
