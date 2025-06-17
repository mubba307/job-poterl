"use client";
import React, { useState } from 'react';
import { API_ENDPOINTS } from '../../../config/api';

const ScheduleInterview = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');

  const sendMeetLink = async () => {
    const meetLink = `https://meet.google.com/new`;
    await fetch('/api/send-email', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ to: email, subject: 'Interview Invitation', text: `Join: ${meetLink}` })
    });
    alert("Meet Link Sent");
  };

  const scheduleInterview = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await fetch(API_ENDPOINTS.SEND_EMAIL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          candidateEmail, 
          interviewDate, 
          position,
          message 
        }),
      });
      setSuccess('Interview scheduled successfully!');
      setCandidateEmail('');
      setInterviewDate('');
      setPosition('');
      setMessage('');
    } catch (err) {
      setError('Failed to schedule interview');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input placeholder="Candidate Email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={sendMeetLink}>Send Meet Link</button>
    </div>
  );
};

export default ScheduleInterview;
