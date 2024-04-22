import React from 'react'
import {useState} from 'react'
import axios from 'axios'
const AddTeacher = () => {
  const [teacher, setTeacher] = useState({
    slno:"",
    Reg_no:"",
    Firstname:"",
    Lastname:"",
    Subjects:"",
    Email_id:"",
  });

  const handleChange =(e) => {
    setTeacher(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault();
    try{
      await axios.post("https://automated-attendance-api.onrender.com/teachers", teacher)
    }catch(err){
      console.log(err)
    }
  }
  console.log(teacher)
  return (
    <div className='form'>
      <h1> Add new Teacher</h1>
      <input type="number" placeholder='slno' onChange={handleChange} name="slno" />
      <input type="text" placeholder="Reg_no" onChange={handleChange} name="Reg_no"/>
      <input type="text" placeholder="First_Name" onChange={handleChange} name="Firstname"/>
      <input type="text" placeholder="Last_Name" onChange={handleChange} name="Lastname"/>
      <input type ="text" placeholder="Course" onChange={handleChange} name="Subjects"/>
      <input type="text" placeholder="Email" onChange={handleChange} name="Email_id"/>
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default AddTeacher;