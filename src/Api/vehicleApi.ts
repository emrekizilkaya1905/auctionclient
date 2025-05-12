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
    createVehicle: builder.mutation({
      query: (vehicleModel: any) => ({
        url: "CreateVehicle",
        method: "POST",
        body: vehicleModel,
      }),
      invalidatesTags: ["vehicle"],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useGetVehicleByIdQuery,
  useRemoveVehicleMutation,
  useCreateVehicleMutation,
} = vehicleApi;
export default vehicleApi;
