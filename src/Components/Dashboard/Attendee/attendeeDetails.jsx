import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../Firebase/firebase';
import { Typography, Container, Box } from '@mui/material';

const AttendeeDetails = () => {
  const { id } = useParams();
  const [attendee, setAttendee] = useState(null);

  useEffect(() => {
    const fetchAttendee = async () => {
      const docRef = doc(db, 'Attendees', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAttendee(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchAttendee();
  }, [id]);

  if (!attendee) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>Attendee Details</Typography>
        <Typography variant="h6">Name: {attendee.name}</Typography>
        <Typography variant="h6">Email: {attendee.email}</Typography>
        <Typography variant="h6">Phone: {attendee.phone}</Typography>
      </Box>
    </Container>
  );
};

export default AttendeeDetails;
