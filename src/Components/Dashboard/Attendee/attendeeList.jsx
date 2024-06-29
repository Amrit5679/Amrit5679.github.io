import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";

const AttendeeList = () => {
  const { id } = useParams();
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const q = query(collection(db, "Attendees"), where("eventId", "==", id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const attendeesData = [];
      querySnapshot.forEach((doc) => {
        attendeesData.push({ id: doc.id, ...doc.data() });
      });
      setAttendees(attendeesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  console.log(attendees);
  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: "sans-serif",
          color: "purple",
          fontWeight: 500,
          mb: 2,
        }}
      >
        Attendeed
      </Typography>
      <Grid container spacing={4}>
        {attendees.map((attendee) => (
          <Grid item key={attendee.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderRadius: "15px",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "Roboto" }}>
                  <strong>Name:</strong>{attendee.userName}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "Roboto" }}>
                <strong>Email:</strong>{attendee.userEmail}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "Roboto" }}>
                <strong>User Id:</strong> {attendee.userId}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "Roboto" }}>
                <strong>Event Id:</strong> {attendee.eventId}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AttendeeList;
