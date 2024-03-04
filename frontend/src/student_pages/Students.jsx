import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Students.css';
const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllStudents = async () => {
            try {
                const res = await axios.get("http://localhost:8800/students");
                setStudents(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllStudents();
    }, []);

    const convertBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer.data);
        bytes.forEach((byte) => {
            binary += String.fromCharCode(byte);
        });
        return window.btoa(binary);
    };

    return (
        <div>
            <h1>Students List</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="StudentsTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USN</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Course</th>
                            <th>Email</th>
                            <th>Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.USN}</td>
                                <td>{student.First_Name}</td>
                                <td>{student.Last_Name}</td>
                                <td>{student.Course}</td>
                                <td>{student.Email}</td>
                                <td>
                                    {student.Photo ? (
                                        <img className="passportPhoto" src={`data:image/jpeg;base64,${convertBufferToBase64(student.Photo)}`} alt="Student Photo" />
                                    ) : (
                                        <p>No photo available</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button><Link to="/add-student">Register Student</Link></button>
        </div>
    );
}

export default Students;
