import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Actions/auth";

const Store=configureStore({
    reducer:{
        auth: authReducer,
    }
});

export default Store;