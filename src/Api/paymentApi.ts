import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7186/api/Payment/",
  }),
  endpoints: (builder) => ({
    doPayment: builder.mutation({
      query: ({ userId, vehicleId }) => ({
        url: "Pay",
        method: "POST",
        params: { userId, vehicleId },
      }),
    }),
  }),
});
export const { useDoPaymentMutation } = paymentApi;
