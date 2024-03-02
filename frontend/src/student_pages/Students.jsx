import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import {Link } from "react-router-dom"
const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(()=>{
        const fetchAllStudents = async () => {
            try {
                const res = await axios.get("http://localhost:8800/students") 
                setStudents(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllStudents()
    },[])
  return (
    <div>
        <h1>Students List</h1>
        <div className ="Students">
            {students.map((student) => (
                <div className='student' key={student.id}>
                
                    <h2>{student.usn}</h2>
                    <h2>{student.First_Name}</h2>
                    <h2>{student.Last_Name}</h2>
                    <h2>{student.Course}</h2>
                    <h2>{student.Email}</h2>
                </div>
            ))}
        </div>
        <button><Link to="/add-student">Register Student</Link></button>
    </div>
  )
}

export default Students