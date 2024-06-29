import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import {
  Grid,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f0f2f5",
});

const Header = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px 0",
});

const DashboardContent = styled(Container)({
  flexGrow: 1,
  padding: "10px 20px",
});

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  const totalEvents = events.length;
  const upcomingEvents = events.filter(
    (event) => new Date(event.eventDate) >= new Date()
  ).length;
  const totalAttendees = events.reduce(
    (total, event) => total + event.attendees,
    0
  );

  return (
    <Root>
      <Header>
        <Typography
          variant="h2"
          sx={{ fontFamily: "sans-serif", color: "purple", fontWeight: 500 }}
        >
          Dashboard
        </Typography>
        <Typography variant="subtitle1">
          {currentTime.toLocaleString()}
        </Typography>
      </Header>
      <DashboardContent component="main" maxWidth="lg">
        <Grid container spacing={4} sx={{ marginTop: "8px" }}>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                height: "100%",
                width: "100%",
                borderRadius: "16px",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">Total Events</Typography>
                <Typography variant="h4">{totalEvents}</Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ borderRadius: '20px',
                    '&:hover': {
                      backgroundColor: 'purple',
                      color: 'white'
                    }
                  }}
                  component={Link}
                  to="/dashboard/events"
                >
                  View Events
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                height: "100%",
                width: "100%",
                borderRadius: "16px",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">Upcoming Events</Typography>
                <Typography variant="h4">{upcomingEvents}</Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ borderRadius: '20px',
                    '&:hover': {
                      backgroundColor: 'purple',
                      color: 'white'
                    }
                  }}
                  component={Link}
                  to="/dashboard/events"
                >
                  View Upcoming Events
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                height: "100%",
                width: "100%",
                borderRadius: "16px",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">Total Attendees</Typography>
                <Typography variant="h4">{totalAttendees}</Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ borderRadius: '20px',
                    '&:hover': {
                      backgroundColor: 'purple',
                      color: 'white'
                    }
                  }}
                  component={Link}
                  to="/dashboard/attendees"
                >
                  View Attendees
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DashboardContent>
    </Root>
  );
};

export default Dashboard;
