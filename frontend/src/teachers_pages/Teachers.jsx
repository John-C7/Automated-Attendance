import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import {Link } from "react-router-dom"
const Teachers = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(()=>{
        const fetchAllStudents = async () => {
            try {
                const res = await axios.get("http://localhost:8800/teachers") 
                setTeachers(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllStudents()
    },[])
  return (
    <div>
        <h1>Teachers List</h1>
        <div className ="Teachers">
            {teachers.map((teachers) => (
                <div className='teachers' key={teachers.id}>
                
                    <h2>{teachers.slno}</h2>
                    <h2>{teachers.Firstname}</h2>
                    <h2>{teachers.Lastname}</h2>
                    <h2>{teachers.Subjects}</h2>
                    <h2>{teachers.Email_id}</h2>
                </div>
            ))}
        </div>
        <button><Link to="/add-teacher">Register Teacher</Link></button>
    </div>
  )
}

export default Teachers;