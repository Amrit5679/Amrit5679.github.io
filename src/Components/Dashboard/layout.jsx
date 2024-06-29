import React from "react";
import { Link, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import { Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import logo from "../../static/Software.jpeg";
import { useSelector } from "react-redux";
import { db } from "../../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const drawerWidth = 240;

const Root = styled("div")({
  display: "flex",
  height: "100vh",
});

const DrawerStyled = styled(Drawer)({
  width: drawerWidth,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "rgba(119,62,135,1)",
    color: "black",
  },
});

const Content = styled(Box)({
  flexGrow: 1,
  padding: "10px",
  backgroundColor: "#f0f2f5",
});

const ToolbarHeader = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = await getDocs(collection(db, "Events"));
      const eventsData = eventsCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  return (
    <Root>
      <DrawerStyled variant="permanent">
        <List sx={{ mt: 20 }}>
          <ListItem component={Link} to="/dashboard" sx={{ gap: 2 }}>
            <ListItemIcon sx={{ color: "#ffffff", justifyContent: "flex-end" }}>
              <HomeIcon sx={{ color: "white", fontFamily: "Roboto" }} />
            </ListItemIcon>
            <ListItemText
              primary="Home"
              sx={{ color: "white", fontFamily: "Roboto" }}
            />
          </ListItem>
          <ListItem component={Link} to="/dashboard/events" sx={{ gap: 2 }}>
            <ListItemIcon sx={{ color: "#ffffff", justifyContent: "flex-end" }}>
              <EventIcon sx={{ color: "white", fontFamily: "Roboto" }} />
            </ListItemIcon>
            <ListItemText
              primary="Events"
              sx={{ color: "white", fontFamily: "Roboto" }}
            />
          </ListItem>
          {events.map((event, index) => (
            <ListItem component={Link} key={event.id} to={`/dashboard/events/${event.id}/attendees`} sx={{ gap: 2 }} >
              {index == 0 && (
                <>
                  <ListItemIcon sx={{color: "white", fontFamily: "Roboto",justifyContent: "flex-end",}}>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText sx={{color: "white",fontFamily: "Roboto",justifyContent: "flex-end",}}primary="Attendees"/>
                </>
              )}
            </ListItem>
          ))}

          <ListItem component={Link} to="/auth/logout" sx={{ gap: 2 }}>
            <ListItemIcon sx={{ justifyContent: "flex-end" }}>
              <LogoutIcon sx={{ color: "white", fontFamily: "Roboto" }} />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "white", fontFamily: "Roboto" }}
              primary="Logout"
            />
          </ListItem>
          <ListItem component={Link} to="/dashboard/account" sx={{ gap: 2 }}>
            <ListItemIcon sx={{ justifyContent: "flex-end" }}>
              <PersonOutlineOutlinedIcon
                sx={{ color: "white", fontFamily: "Roboto" }}
              />
            </ListItemIcon>
            <ListItemText
              primary={user ? user.firstName.toUpperCase() : "Guest"}
              sx={{ color: "white", fontFamily: "Roboto" }}
            />
          </ListItem>
        </List>
      </DrawerStyled>
      <Content>
        <ToolbarHeader sx={{ pt: 1 }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: "20px" }}
            component={Link}
            to="/dashboard/createEvent"
          >
            + Create Event
          </Button>
        </ToolbarHeader>
        <Outlet />
      </Content>
    </Root>
  );
};

export default DashboardLayout;
