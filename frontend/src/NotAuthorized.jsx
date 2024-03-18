import React from 'react'
// import {Navigate} from "react-router-dom";
import {Link} from "react-router-dom";
const NotAuthorized = () => {
  return (
    <div>
        <h1>Not Authorized</h1>
        <button className='btn-1'>
            <Link to="/" >Login Page</Link>
        </button>
    </div>
  )
}

export default NotAuthorized;