"use client";
import React, { useState } from 'react';

const NotificationSender = () => {
  const [message, setMessage] = useState('');

  const sendNotification = async () => {
    await fetch('/api/send-notification', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ message })
    });
    alert("Notification Sent");
  };

  return (
    <div>
      <textarea onChange={(e) => setMessage(e.target.value)} placeholder="Type your notification"></textarea>
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
};

export default NotificationSender;
