import React, { useState } from 'react';
import {Box,TextField,Button,Typography,Container,Grid,Paper,} from '@mui/material';
import {db,storage} from '../../Firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    eventTitle: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    eventDescription: '',
    eventImage: null,
    ticketPrice: '',
    maxParticipants: '',
  });

  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value ,files} = e.target;
    if (name === 'eventImage' && files.length > 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: files[0],
        }));
    } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
   }

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { eventTitle, eventDate, eventTime, eventLocation, eventDescription, eventImage,ticketPrice,maxParticipants } = formData;
      let eventImageUrl='';
      if(eventImage){
        const storageRef= ref(storage,`Events/${eventImage.name}`);
        await uploadBytes(storageRef,eventImage);
        eventImageUrl=await getDownloadURL(storageRef);
      }
      const docRef = await addDoc(collection(db, 'Events'), {
        eventTitle,
        eventDate,
        eventTime,
        eventLocation,
        eventDescription,
        eventImage: eventImageUrl,
        ticketPrice,
        maxParticipants,
        createdAt: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
      setFormData({
        eventTitle: '',
        eventDate: '',
        eventTime: '',
        eventLocation: '',
        eventDescription: '',
        eventImage: null,
        ticketPrice: '',
        maxParticipants:'0',
      });
      navigate('/dashboard/events');
  }
  catch (error) {
      console.error('Error creating event: ', error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography component="h1" variant="h5">
          Create Event
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="eventTitle"
                label="Event Title"
                name="eventTitle"
                value={formData.eventTitle}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="eventDate"
                label="Event Date"
                type="date"
                name="eventDate"
                InputLabelProps={{ shrink: true }}
                value={formData.eventDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="eventTime"
                label="Event Time"
                type="time"
                name="eventTime"
                InputLabelProps={{ shrink: true }}
                value={formData.eventTime}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="eventLocation"
                label="Event Location"
                name="eventLocation"
                value={formData.eventLocation}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="ticketPrice"
                label="Ticket Price"
                name="ticketPrice"
                type="number"
                value={formData.ticketPrice}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="maxParticipants"
                label="Max Participants"
                name="maxParticipants"
                type="number"
                value={formData.maxParticipants}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="eventDescription"
                label="Event Description"
                name="eventDescription"
                multiline
                rows={4}
                value={formData.eventDescription}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
              <input
                fullWidth
                id="eventImage"
                name="eventImage"
                type="file"
                onChange={handleChange}
                inputProps={{ accept: 'image/*' }}
              />
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Event
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateEvent;
