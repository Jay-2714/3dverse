"use client"
import { configureStore } from '@reduxjs/toolkit';
import roleReducer from "./roles/roleSlice";


export const store = configureStore({
    reducer: roleReducer,
});

