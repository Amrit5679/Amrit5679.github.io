import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Explore from '../Components/Common/explore';
import Login from '../Components/Auth/login';
import Signup from '../Components/Auth/signup';
import Logout from "../Components/Auth/logout";
import Dashboard from '../Components/Dashboard/dashboard';
import CreateEvent from '../Components/Dashboard/createEvent';
import EventsPage from '../Components/Dashboard/events';
import Account from '../Components/Dashboard/account';
import EventDetails from '../Components/Dashboard/eventDetails';
import AttendeesList from '../Components/Dashboard/Attendee/attendeeList';
import AttendeeDetails from '../Components/Dashboard/Attendee/attendeeDetails';
import SendNotification from '../Components/Dashboard/notification';
import DashboardLayout from '../Components/Dashboard/layout';
import LandingPage from '../Components/Common/landing';
import PrivateRoute from './privateRoute';
import { useSelector } from 'react-redux';

const AppRouter = () => {
  const {isLoggedIn,loading,isSiggnedUp}=useSelector((state) => state.auth);
  if (loading) {
    return <div>Loading...</div>; 
  }
  return (
  <Router>
    <Routes>
      <Route exact path='/' element={<LandingPage />} />
      <Route path='/explore' element={<Explore />} />
      <Route path="/auth/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/auth/signup" element={isSiggnedUp ? <Navigate to="/auth/login" /> : <Signup />} />

      {isLoggedIn && (
        <>
          <Route path="/auth/logout" element={<Logout />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardLayout/>}>
              <Route index element={<Dashboard />} />
              <Route path="createEvent" element={<CreateEvent />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="events/:id" element={<EventDetails />} />
              <Route path="account" element={<Account />} />
              <Route path="events/:id/attendees" element={<AttendeesList />} />
              {/* <Route path="attendees/:id" element={<AttendeeDetails />} /> */}
            </Route>
          </Route>
        </>
      )}
      
      <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/auth/login"} />} />  
    </Routes>
  </Router>
  );
};
export default AppRouter;
