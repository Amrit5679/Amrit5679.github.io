import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, query, onSnapshot, doc, addDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import {
  Grid,
  Card,
  Container,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import notFound from "../../static/eventNotFound.svg";
import { toast } from "react-toastify";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "Events"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventsData = [];
      querySnapshot.forEach((doc) => {
        eventsData.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsData);
    });

    return () => unsubscribe();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/dashboard/events/${id}`);
  };

  const handleAttend = async (eventId) => {
    let fullName= user.firstName+' '+user.lastName;
    if (!user) {
      alert("You need to be logged in to attend an event.");
      return;
    }
    const attendeeData = {
      userId: user.userId,
      userName: fullName,
      userEmail: user.email,
      eventId: eventId,
      attendedAt: new Date(),
    };
    await addDoc(collection(db, "Attendees"), attendeeData);
    alert("You are added to the event");
  };

  return (
    <Box
      sx={{
        padding: 4,
        height: "91vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Typography
          variant="h3"
          sx={{ fontFamily: "sans-serif", color: "purple", fontWeight: 500,mb:2 }}
      >
        Events
      </Typography>
      <Grid container spacing={4}>
        {events.length === 0 ? (
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 4,
              }}
            >
              <Typography sx={{ mb: 4 }}>
                No events found. Add your first event.
              </Typography>
              <CardMedia
                component="img"
                image={notFound}
                alt="not found"
                sx={{ height: 350, width: 550 }}
              />
            </Card>
          </Grid>
        ) : (
          events.map((event) => (
            <Grid item key={event.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  borderRadius: "15px",
                }}
              >
                {event.eventImage && (
                  <CardMedia
                    component="img"
                    height="250"
                    image={event.eventImage}
                    alt={event.eventTitle}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontFamily: "Roboto" }}>
                    {event.eventTitle}
                  </Typography>
                  <Typography sx={{ fontFamily: "Roboto" }}>
                    Date: {new Date(event.eventDate).toLocaleDateString()}
                  </Typography>
                  <Typography sx={{ fontFamily: "Roboto" }}>
                    Time: {event.eventTime}
                  </Typography>
                  <Typography sx={{ fontFamily: "Roboto" }}>
                    Location: {event.eventLocation}
                  </Typography>
                  <Typography sx={{ fontFamily: "Roboto" }}>
                    Ticket Price: ${event.ticketPrice}
                  </Typography>
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      onClick={() => handleViewDetails(event.id)}
                      variant="outlined"
                      sx={{ borderRadius: "20px" }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ borderRadius: "20px" }}
                      onClick={() => handleAttend(event.id)}
                    >
                      Attend Event
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default EventsPage;
