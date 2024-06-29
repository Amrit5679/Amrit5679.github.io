import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Explore = () => {
  const [events, setEvents] = useState([]);
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
  return (
    <Box
      sx={{
        padding: 4,
        height: "91vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "rgba(119,62,135,1)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: "flex", mb: 4, color: "white", fontFamily: "Roboto" }}
      >
        Explore Events
      </Typography>
      <Grid container spacing={4}>
        {events.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={4}>
            <Card>
              {event.eventImage && (
                <CardMedia
                  component="img"
                  height="250"
                  image={event.eventImage}
                  alt={event.eventTitle}
                />
              )}
              <CardContent>
                <Typography variant="h6" sx={{ fontFamily: 'Roboto'}}>{event.eventTitle}</Typography>
                <Typography sx={{ fontFamily: 'Roboto'}}>
                  Date: {new Date(event.eventDate).toLocaleDateString()}
                </Typography>
                <Typography sx={{ fontFamily: 'Roboto'}}>Time: {event.eventTime}</Typography>
                <Typography sx={{ fontFamily: 'Roboto'}}>Location: {event.eventLocation}</Typography>
                <Typography sx={{ fontFamily: 'Roboto'}}>
                  Max Participants: {event.maxParticipants}
                </Typography>
                <Typography sx={{ fontFamily: 'Roboto'}}>Ticket Price: ${event.ticketPrice}</Typography>
                <Typography sx={{ fontFamily: 'Roboto'}}>Description: {event.eventDescription}</Typography>
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    onClick={() => {
                      navigate("/auth/login");
                    }}
                    variant="outlined"
                    sx={{ borderRadius: "20px" }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ borderRadius: "20px" }}
                    onClick={() => navigate("/auth/login")}
                  >
                    Attend Event
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Explore;
