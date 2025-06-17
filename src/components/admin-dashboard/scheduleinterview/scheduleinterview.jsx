"use client";
import React, { useState } from 'react';

const ScheduleInterview = () => {
  const [email, setEmail] = useState('');

  const sendMeetLink = async () => {
    const meetLink = `https://meet.google.com/new`;
    await fetch('/api/send-email', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ to: email, subject: 'Interview Invitation', text: `Join: ${meetLink}` })
    });
    alert("Meet Link Sent");
  };

  return (
    <div>
      <input placeholder="Candidate Email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={sendMeetLink}>Send Meet Link</button>
    </div>
  );
};

export default ScheduleInterview;
