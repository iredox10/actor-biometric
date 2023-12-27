import React from 'react'
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="capitalize ">
      <NavLink to={"/"}>
        <h1 className="text-2xl font-bold">
          student <span className="text-green-500">attendance</span>
        </h1>
      </NavLink>
    </div>
  );
}

export default Header