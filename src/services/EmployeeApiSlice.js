import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../routes/apiSlice";

const employeeAdapter = createEntityAdapter({});
const initialState = employeeAdapter.getInitialState();

export const EmployeeApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    ReadEmployee: builder.query({
      query: () => '/api/Employees',
      validateStatus: (response, result) => response.status === 200 && !result.isError,
      transformResponse: resData => {
        // Map API fields to frontend-friendly fields
        const newData = resData.map(emp => ({
          id: emp.hed_Employee_id,
          name: emp.hed_Employee_Name,
          address: emp.hed_Employee_Hometown,
          department: emp.Department?.hdd_Department_Name || "-",
          departmentLocation: emp.Location?.hld_location_Name || "-",
          designation: emp.Designation?.hdd_Designation_Name || "-",
          education: emp.Education?.hed_Education_Name || "-",
        }));
        return employeeAdapter.setAll(initialState, newData);
      },
      providesTags: result =>
        result?.ids
          ? [
              { type: 'Employee', id: 'LIST' },
              ...result.ids.map(id => ({ type: 'Employee', id }))
            ]
          : [{ type: 'Employee', id: 'LIST' }]
    }),
    createEmp: builder.mutation({
      query: initialData => ({
        url: 'api/Employees',
        method: 'POST',
        body: { ...initialData }
      }),
      invalidatesTags: [{ type: 'Employee', id: 'LIST' }]
    }),
    updateEmp: builder.mutation({
      query: emp => ({
        url: `/api/Employees/${emp.id}`,
        method: 'PUT',
        body: emp
      }),
      invalidatesTags: (r, e, arg) => [{ type: 'Employee', id: arg.id }]
    }),
    deleteEmployee: builder.mutation({
      query: id => ({
        url: `/api/Employees/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (r, e, arg) => [{ type: 'Employee', id: arg }]
    }),
  })
});

export const selectReadEmployeeResult = EmployeeApiSlice.endpoints.ReadEmployee.select();
const selectReadEmployeeData = createSelector(selectReadEmployeeResult, selectTheData => selectTheData.data);

export const {
  selectAll: selectAllEmployee,
  selectById: selectEmployeeById
} = employeeAdapter.getSelectors(state => selectReadEmployeeData(state) ?? initialState);

export const {
  useReadEmployeeQuery,
  useCreateEmpMutation,
  useUpdateEmpMutation,
  useDeleteEmployeeMutation
} = EmployeeApiSlice;
