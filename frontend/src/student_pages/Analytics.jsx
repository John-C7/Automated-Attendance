import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';

const AttendanceTable = ({ attendanceData }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const AttendanceForm = ({ onSubmit }) => {
  const [usn, setUsn] = useState('');
  const [subjectId, setSubjectId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(usn, subjectId);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <TextField
        label="USN"
        variant="outlined"
        value={usn}
        onChange={(e) => setUsn(e.target.value)}
        required
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Subject Code"
        variant="outlined"
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
        required
        style={{ marginBottom: '10px' }}
      />
      <Button type="submit" variant="contained">Submit</Button>
    </form>
  );
};

const Analytics = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  const handleSubmit = (usn, subjectId) => {
    fetch(`http://localhost:8800/attendance/${usn}/${subjectId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAttendanceData(sortedData);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Student Attendance</h1>
      <AttendanceForm onSubmit={handleSubmit} />
      <AttendanceTable attendanceData={attendanceData} />
    </div>
  );
};

export default Analytics;
