import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


const vehicleApi=createApi({
  reducerPath:"vehicleApi",
  baseQuery:fetchBaseQuery({
    baseUrl:"https://localhost:7186/api/Vehicle/"
  }),
  endpoints:(builder)=> ({
    getVehicles:builder.query({
      query:()=>({
        url:"GetVehicles"
      })
    }),
  })
});

export const {useGetVehiclesQuery}=vehicleApi
export default vehicleApi