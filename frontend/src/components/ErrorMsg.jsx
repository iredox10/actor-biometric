import React from 'react'

const ErrorMsg = ({err}) => {
  return (
    <div className="capitalize text-red-600 font-bold">{err}</div>
  )
}

export default ErrorMsg