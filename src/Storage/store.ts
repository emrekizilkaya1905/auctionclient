import { configureStore } from "@reduxjs/toolkit";
import { vehicleReducer } from "./Redux/vehicleSlice";
import vehicleApi from "../Api/vehicleApi";

const store =configureStore({
  reducer: {
    vehiceleStore:vehicleReducer,
    [vehicleApi.reducerPath]:vehicleApi.reducer

  },middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(vehicleApi.middleware)
    
})
  
export type RootState=ReturnType<typeof store.getState>;
export default store
