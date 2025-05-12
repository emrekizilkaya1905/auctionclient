import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//https://localhost:7186/api/Vehicle/Remove/Vehicle/99
const vehicleApi = createApi({
  reducerPath: "vehicleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7186/api/Vehicle/",
  }),
  tagTypes: ["vehicle"],
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: () => ({
        url: "GetVehicles",
      }),
    }),
    getVehicleById: builder.query({
      query: (id) => ({
        url: `${id}`,
      }),
    }),
    removeVehicle: builder.mutation({
      query: (id) => ({
        url: `Remove/Vehicle/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vehicle"],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useGetVehicleByIdQuery,
  useRemoveVehicleMutation,
} = vehicleApi;
export default vehicleApi;
