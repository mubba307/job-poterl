'use client';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ApplyNowForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'your_real_service_id',    // Replace with your actual Service ID
      'your_real_template_id',   // Replace with your actual Template ID
      form.current,
      'your_real_public_key'     // Replace with your actual Public Key
    )
      .then((result) => {
          console.log('Success:', result.text);
          alert('Application sent to the employer!');
      }, (error) => {
          console.log('Failed:', error.text);
          alert('Failed to send the application.');
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Apply for this Job</h2>

      <label className="block mb-2 font-medium">Your Name</label>
      <input type="text" name="user_name" required className="w-full p-2 mb-4 border rounded"/>

      <label className="block mb-2 font-medium">Your Email</label>
      <input type="email" name="user_email" required className="w-full p-2 mb-4 border rounded"/>

      <label className="block mb-2 font-medium">Cover Letter / Message</label>
      <textarea name="message" required className="w-full p-2 mb-4 border rounded" rows="5" />

      <input type="submit" value="Apply Now" className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700" />
    </form>
  );
};

export default ApplyNowForm;
