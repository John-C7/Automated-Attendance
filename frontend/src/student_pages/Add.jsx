import React from 'react'
import {useState} from 'react'
import axios from 'axios'
const Add = () => {
  const [student, setStudents] = useState({
    id:"",
    usn:"",
    First_Name:"",
    Last_Name:"",
    Course:"",
    Email:"",
  });

  const handleChange =(e) => {
    setStudents(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:8800/students", student)
    }catch(err){
      console.log(err)
    }
  }
  console.log(student)
  return (
    <div className='form'>
      <h1> Add new student</h1>
      <input type="number" placeholder='id' onChange={handleChange} name="id" />
      <input type="text" placeholder="USN" onChange={handleChange} name="usn"/>
      <input type="text" placeholder="First_Name" onChange={handleChange} name="First_Name"/>
      <input type="text" placeholder="Last_Name" onChange={handleChange} name="Last_Name"/>
      <input type ="text" placeholder="Course" onChange={handleChange} name="Course"/>
      <input type="text" placeholder="Email" onChange={handleChange} name="Email"/>
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add