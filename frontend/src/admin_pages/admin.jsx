import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Adjust as needed
  };

  const buttonStyle = {
    padding: '15px 30px', // Larger padding
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundSize: 'cover',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px', 
    height: '100px',
  };

  const hoverStyle = {
    backgroundColor: 'Black',
  };

  return (
    <div style={containerStyle}>
      <button style={{ ...buttonStyle }}>
        <Link to="/Students" style={{ color: 'Blue', textDecoration: 'none' }}>Students List</Link>
      </button>
      <br />
      <button style={{ ...buttonStyle }}>
        <Link to="/add-student" style={{ color: 'Blue', textDecoration: 'none' }}>Register Student</Link>
      </button>
      <br />
      <button style={{ ...buttonStyle }}>
        <Link to="/Teachers" style={{ color: 'Red', textDecoration: 'none' }}>Teachers List</Link>
      </button>
      <br />
      <button style={{ ...buttonStyle }}>
        <Link to="/add-teacher" style={{ color: 'Red', textDecoration: 'none' }}>Register Teacher</Link>
      </button>
      <br />
      <button style={{ ...buttonStyle }}>
        <Link to="/update-student" style={{ color: 'Blue', textDecoration: 'none' }}>Update Student</Link>
      </button>
    </div>
  );
};

export default Admin;
