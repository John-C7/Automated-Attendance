import React, { useState } from 'react';

const StudentsInCourse = () => {
  const [course, setCourse] = useState('');
  const [students, setStudents] = useState([]);
  const [numStudents, setNumStudents] = useState(0);

  const handleSubmit = () => {
    fetch(`http://localhost:8800/students/${course}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data.students);
        setNumStudents(data.numStudents);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <label>Course:</label>
      <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} />
      <button onClick={handleSubmit}>Get Students</button>
      <p>Number of Students: {numStudents}</p>
      <ul>
        {students.map((student) => (
          <li key={student.USN}>
            {student.First_Name} {student.Last_Name} - {student.USN}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsInCourse;
