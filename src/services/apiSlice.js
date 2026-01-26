import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:44364/api/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Register Borrower
    registerUser: builder.mutation({
      query: (payload) => ({
        url: "users/register",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    // Send OTP
    sendOtp: builder.mutation({
      query: (payload) => ({
        url: "users/send-otp",
        method: "POST",
        body: payload,
      }),
    }),

    // Login
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "users/login",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useSendOtpMutation,
  useLoginUserMutation,
} = apiSlice;
