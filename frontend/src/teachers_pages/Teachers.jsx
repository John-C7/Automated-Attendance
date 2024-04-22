
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Teachers.css'; // Import the CSS file

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllTeachers = async () => {
            try {
                const res = await axios.get("https://automated-attendance-api.onrender.com/teachers");
                setTeachers(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllTeachers();
    }, []);

    return (
        <div>
            <h1>Teachers List</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="TeachersTable">
                    <thead>
                        <tr>
                            <th>Sl. No</th>
                            <th>Registration No</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Subjects</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher.slno}>
                                <td>{teacher.slno}</td>
                                <td>{teacher.Reg_no}</td>
                                <td>{teacher.Firstname}</td>
                                <td>{teacher.Lastname}</td>
                                <td>{teacher.Subjects}</td>
                                <td>{teacher.Email_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button><Link to="/add-teacher">Register Teacher</Link></button>
        </div>
    );
}

export default Teachers;
