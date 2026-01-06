import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:64482/", // your MVC backend
  }),
  tagTypes: ["Employee"],
  endpoints: () => ({}), // empty; will inject endpoints from EmployeeService
});
