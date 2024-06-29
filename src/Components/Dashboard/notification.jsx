import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';
import { TextField, Button, Box } from '@mui/material';

const SendNotification = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'Notifications'), {
      eventId: id,
      message,
      sentAt: new Date(),
    });
    setMessage('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        required
        fullWidth
        id="message"
        label="Notification Message"
        name="message"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" fullWidth variant="contained" color="primary">
        Send Notification
      </Button>
    </Box>
  );
};

export default SendNotification;
