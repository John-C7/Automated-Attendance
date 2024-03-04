import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [newAttendance, setNewAttendance] = useState({ student_usn: '', subject_id: '', date: '', status: '' });
  const [attendancePercentage, setAttendancePercentage] = useState(0);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/attendance/${newAttendance.student_usn}/${newAttendance.subject_id}`);
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addAttendance = async () => {
    try {
      await axios.post('http://localhost:8800/attendance', newAttendance);
      fetchAttendance(); 
    } catch (err) {
      console.error(err);
    }
  };

  const calculateAttendancePercentage = () => {
    const totalClasses = attendance.length;
    const attendedClasses = attendance.filter(entry => entry.status === 'present').length;
    const percentage = (attendedClasses / totalClasses) * 100;
    setAttendancePercentage(percentage.toFixed(2));
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div>
      <h1>Attendance</h1>
      <div>
        <input type="text" placeholder="Student USN" value={newAttendance.student_usn} onChange={(e) => setNewAttendance({ ...newAttendance, student_usn: e.target.value })} />
        <input type="text" placeholder="Subject ID" value={newAttendance.subject_id} onChange={(e) => setNewAttendance({ ...newAttendance, subject_id: e.target.value })} />
        <input type="date" placeholder="Date" value={newAttendance.date} onChange={(e) => setNewAttendance({ ...newAttendance, date: e.target.value })} />
        <input type="text" placeholder="Status" value={newAttendance.status} onChange={(e) => setNewAttendance({ ...newAttendance, status: e.target.value })} />
        <button onClick={addAttendance}>Add Attendance</button>
      </div>
      <div>
        <h2>Attendance List</h2>
        <ul>
          {attendance.map((entry, index) => (
            <li key={index}>{entry.student_usn} - {entry.subject_id} - {entry.date} - {entry.status}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Calculate Attendance Percentage</h2>
        <input type="text" placeholder="Student USN" value={newAttendance.student_usn} onChange={(e) => setNewAttendance({ ...newAttendance, student_usn: e.target.value })} />
        <input type="text" placeholder="Subject ID" value={newAttendance.subject_id} onChange={(e) => setNewAttendance({ ...newAttendance, subject_id: e.target.value })} />
        <button onClick={calculateAttendancePercentage}>Calculate Percentage</button>
        <p>Attendance Percentage: {attendancePercentage}%</p>
      </div>
    </div>
  );
};

export default Attendance;
