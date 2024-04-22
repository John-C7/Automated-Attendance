import React, { useState } from "react";
import axios from "axios";

const Update = () => {
  const [usn, setUsn] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`https://automated-attendance-api.onrender.com/students/${usn}`);
      setMessage(response.data);
      setUsn("");
    } catch (error) {
      setMessage("Error deleting student details. Please try again.");
    }
  };

  return (
    <div>
      <h2>Delete Student Data</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Student USN:
          <input
            type="text"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
          />
        </label>
        <button type="submit">Delete</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Update;
