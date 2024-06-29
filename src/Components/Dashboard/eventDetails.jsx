import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  TextField,
  CardActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editEventData, setEditEventData] = useState({
    eventTitle: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    eventDescription: "",
    ticketPrice: "",
    maxParticipants: "",
  });
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchEvent = async () => {
      const docSnap = await getDoc(doc(db, "Events", id));
      if (docSnap.exists()) {
        setEvent(docSnap.data());
        setEditEventData(docSnap.data());
      }
    };
    fetchEvent();
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    const eventDocRef = doc(db, "Events", id);
    await updateDoc(eventDocRef, editEventData);
    setEvent(editEventData);
    setEditMode(false);
  };

  const handleDelete = async () => {
    const eventDocRef = doc(db, "Events", id);
    await deleteDoc(eventDocRef);
    navigate("/dashboard/events");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAttendEvent = async () => {
    let fullName= user.firstName+' '+user.lastName;
    if (!user) {
      alert("You need to be logged in to attend an event.");
      return;
    }
    const attendeeData = {
      userId: user.userId,
      userName: fullName,
      userEmail: user.email,
      eventId: id,
      attendedAt: new Date(),
    };
    await addDoc(collection(db, "Attendees"), attendeeData);
    alert("You are added to the event");
  };

  if (!event) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 8}}>
      <Card
        
      >
        <CardContent
         sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          height: '70vh',
          gap: 2
        }}>
          <Box sx={{ width: '50%', height: "50%"}}>
            {event.eventImage && (
              <CardMedia
                component="img"
                image={event.eventImage}
                alt={event.eventTitle}
              />
            )}
          </Box>
          {editMode ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'scroll', height: '100%', width: '50%'}}>
              <TextField
                fullWidth
                label="Event Title"
                name="eventTitle"
                value={editEventData.eventTitle}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Event Date"
                type="date"
                name="eventDate"
                InputLabelProps={{ shrink: true }}
                value={editEventData.eventDate}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Event Time"
                type="time"
                name="eventTime"
                InputLabelProps={{ shrink: true }}
                value={editEventData.eventTime}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Event Location"
                name="eventLocation"
                value={editEventData.eventLocation}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                required
                fullWidth
                id="ticketPrice"
                label="Ticket Price"
                name="ticketPrice"
                type="number"
                value={editEventData.ticketPrice}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                fullWidth
                id="maxParticipants"
                label="Max Participants"
                name="maxParticipants"
                type="number"
                value={editEventData.maxParticipants}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Event Description"
                name="eventDescription"
                multiline
                rows={4}
                value={editEventData.eventDescription}
                onChange={handleChange}
                margin="normal"
              />
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Save
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
              <Typography gutterBottom variant="h4" component="div" color="text.secondary">
                {event.eventTitle}
              </Typography>
              <Typography variant="body1" color="text.secondary"><strong>Date: </strong>{event.eventDate}</Typography>
              <Typography variant="body1" color="text.secondary"><strong>Time:</strong> {event.eventTime}</Typography>
              <Typography variant="body1" color="text.secondary">
                <strong>Location:</strong> {event.eventLocation}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <strong>Ticket Price:</strong> {event.ticketPrice}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <strong>Max Participants:</strong> {event.maxParticipants}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
              >
              <strong>Description :</strong> {event.eventDescription}
              </Typography>
              <CardActions>
                {user && user.uid === event.creatorId && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleEdit}
                    >
                      Edit
                      <EditIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDelete}
                    >
                      Delete
                      <DeleteIcon />
                    </Button>
                  </>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAttendEvent}
                >
                  Attend Event
                </Button>
                {user.uid === event.creatorId && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      navigate(`/dashboard/events/${id}/attendees`)
                    }
                  >
                    View Attendees
                  </Button>
                )}
              </CardActions>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default EventDetails;
