import React from 'react'
import {Link } from "react-router-dom"
const Admin = () => {
  return (
    <div>
        <button><Link to="/Students">Students List</Link></button>
        <br />
        <button><Link to="/add-student">Register Student</Link></button>
        <br />
        <button><Link to="/Teachers">Teachers List</Link></button>
        <br />
        <button><Link to="/add-teacher">Register Teacher</Link></button>
    </div>
  )
}

export default Admin;