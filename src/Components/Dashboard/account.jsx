import React, { useEffect, useState } from 'react';
import {Box,TextField,Button,Typography,Container,Grid,Paper,} from '@mui/material';
import { auth,db } from '../../Firebase/firebase';
import { collection, doc,onSnapshot, getDoc, updateDoc } from 'firebase/firestore';

const AccountsPage = () => {

  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
        setLoading(false);
      } else {
        console.error("No such document!");
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchUserData(user);
      } else {
        console.error("No user is signed in.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditUserData({...item});
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditUserData(null);
  };

  const handleSave = async() => {
    const docRef= doc(db,"Users",userData.uid);
    await updateDoc(docRef,{
      firstName:editUserData.firstName,
      lastName:editUserData.lastName
    })
    setUserData(editUserData);
    setEditMode(false);
  };

  if (loading || !userData) {
    return <div>Loading...</div>;
  }
  
  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography component="h1" variant="h5">
          Hello, {userData.firstName}
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                name="lastName"
                value={userData.firstName}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={userData.email}
                disabled
              />
            </Grid>
          </Grid>
          {editMode ? (
            <>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                sx={{ mb: 2 }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleEdit}
            >
              Edit
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AccountsPage;
