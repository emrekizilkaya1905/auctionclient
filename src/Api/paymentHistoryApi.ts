// https://localhost:7186/api/PaymentHistory/CheckStatus
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentHistoryApi = createApi({
  reducerPath: "paymentHistoryApi", // "paymentHistoyApi" yazımı hatalıydı, "History" olarak düzeltildi.
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7186/api/PaymentHistory/", // Base URL doğru şekilde bırakıldı
  }),
  endpoints: (builder) => ({
    checkStatusAuctionPrice: builder.mutation({
      query: (statusDetail) => ({
        url: "CheckStatus", // URL doğru şekilde belirtildi
        method: "POST", // POST metodu belirtildi
        body: statusDetail, // body parametresi doğru şekilde yazıldı
      }),
    }),
  }),
});

export const { useCheckStatusAuctionPriceMutation } = paymentHistoryApi;
