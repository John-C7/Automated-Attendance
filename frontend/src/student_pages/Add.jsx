import React, { useState } from 'react';
import axios from 'axios';

const Add = () => {
  const [student, setStudent] = useState({
    id: "",
    usn: "",
    First_Name: "",
    Last_Name: "",
    Course: "",
    Email: "",
    Photo: null, 
  });

  const handleChange = (e) => {
    if (e.target.name === "Photo") {
      setStudent(prev => ({ ...prev, Photo: e.target.files[0] }));
    } else {
      setStudent(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", student.id);
      formData.append("usn", student.usn);
      formData.append("First_Name", student.First_Name);
      formData.append("Last_Name", student.Last_Name);
      formData.append("Course", student.Course);
      formData.append("Email", student.Email);
      formData.append("Photo", student.Photo);

      await axios.post("http://localhost:8800/students", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='form'>
      <h1> Add new student</h1>
      <input type="number" placeholder='id' onChange={handleChange} name="id" />
      <input type="text" placeholder="USN" onChange={handleChange} name="usn" />
      <input type="text" placeholder="First_Name" onChange={handleChange} name="First_Name" />
      <input type="text" placeholder="Last_Name" onChange={handleChange} name="Last_Name" />
      <input type="text" placeholder="Course" onChange={handleChange} name="Course" />
      <input type="text" placeholder="Email" onChange={handleChange} name="Email" />
      <input type="file" placeholder="Photo" onChange={handleChange} name="Photo" />
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add;
