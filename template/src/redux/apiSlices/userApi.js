import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// endpoints
import {BASE_URL, SEND_OTP_API, VERIFY_OTP_API} from '../../config';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    // TODO: refactor/encapsulate fetchBaseQuery
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    sendOtp: builder.mutation({
      query: data => ({
        url: SEND_OTP_API,
        method: 'POST',
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: data => ({
        url: VERIFY_OTP_API,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {useSendOtpMutation, useVerifyOtpMutation} = userApi;
