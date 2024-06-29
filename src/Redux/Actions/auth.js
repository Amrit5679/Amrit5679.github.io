import { createSlice } from '@reduxjs/toolkit';
import { auth,db } from '../../Firebase/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword,createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc,getDoc,setDoc } from 'firebase/firestore';
import { useEffect } from 'react';

const initialState = {
  isLoggedIn: false,
  isSiggnedUp:false,
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    clearAuthState(state) {
      state.isLoggedIn = false;
      state.isSiggnedUp = false;
      state.user = null;
      state.loading = false;
    },
    setSignUpState(state,action){
      state.isSiggnedUp=action.payload.isSiggnedUp;
    },
  },
});

export const { setAuthState, setLoading,clearAuthState,setSignUpState} = authSlice.actions;

export const initializeAuthListener = () => async(dispatch) => {
  dispatch(setLoading(true));
  onAuthStateChanged(auth, async(user) => {
    if (user) {
      const userDoc=await getDoc(doc(db,'Users',user.uid));
      if(userDoc.exists()){
        const userData=userDoc.data();
        dispatch(setAuthState({ isLoggedIn: true, user:userData }));
      }
    } else {
      dispatch(setAuthState({ isLoggedIn: false, user: null }));
    }
    dispatch(setLoading(false));
  });
};

export const login = (email, password) => async (dispatch) => {
  try {
     const userCredential=await signInWithEmailAndPassword(auth, email, password); 
     const user=userCredential.user;
     if (!user || !user.uid) {
       throw new Error("User UID is undefined after login.");
     }
     const userDoc=await getDoc(doc(db,'Users',user.uid));
     if(userDoc.exists()){
        const userData=userDoc.data();
        console.log(userData);
        dispatch(setAuthState({isLoggedIn:true,user:userData}));
     } else {
        throw new Error("User data not found in Firestore.");
     }
    } catch (error) {
      console.error('Error logging in:',error);
      return error.message;
    }
};

export const signup = (email, password,fName,lName) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if(user){
      await setDoc(doc(db, 'Users', user.uid), {
        email,
        firstName:fName,
        lastName:lName,
        userId:user.uid,
      });
      dispatch(setSignUpState({ isSignedUp: true }));
    }
  } catch (error) {
    console.error('Error signing up:', error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(clearAuthState());
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

export default authSlice.reducer;
