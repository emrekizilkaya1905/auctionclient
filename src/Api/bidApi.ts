import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bidApi = createApi({
  reducerPath: "bidApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7186/api/Bid/",
  }),
  endpoints: (builder) => ({
    getBidByVehicleId: builder.query({
      // <ResponseType, ParamType>
      query: (vehicleId) => ({
        method: "GET",
        url: `getBidsByVehicle/${vehicleId}`,
        params: vehicleId,
      }), // Örn: /api/Bid/{id}
    }),
  }),
});
export const { useGetBidByVehicleIdQuery } = bidApi;
