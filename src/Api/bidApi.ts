import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { bidModel } from "../interfaces/bidModel";

export const bidApi = createApi({
  reducerPath: "bidApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7186/api/Bid/",
  }),
  tagTypes: ["Bids"],
  endpoints: (builder) => ({
    getBidByVehicleId: builder.query({
      query: (vehicleId) => ({
        method: "GET",
        url: `getBidsByVehicle/${vehicleId}`,
        params: vehicleId,
      }),
    }),
    createBid: builder.mutation({
      query: (bidModel: bidModel) => ({
        method: "POST",
        url: "Create",
        body: bidModel,
      }),
      invalidatesTags: ["Bids"],
    }),
  }),
});

export const { useGetBidByVehicleIdQuery, useCreateBidMutation } = bidApi;
