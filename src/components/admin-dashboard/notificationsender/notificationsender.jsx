"use client";
import React, { useState } from 'react';
import { API_ENDPOINTS } from '../../../config/api';

const NotificationSender = () => {
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sendNotification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await fetch(API_ENDPOINTS.SEND_NOTIFICATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, recipients }),
      });
      setSuccess('Notification sent successfully!');
      setMessage('');
      setRecipients('');
    } catch (err) {
      setError('Failed to send notification');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <textarea onChange={(e) => setMessage(e.target.value)} placeholder="Type your notification"></textarea>
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
};

export default NotificationSender;
