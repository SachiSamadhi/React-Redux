import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";


const employeeAdapter = createEntityAdapter({});
const initialState = employeeAdapter.getInitialState();


export const EmployeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ===== READ ALL EMPLOYEES =====
    readEmployees: builder.query({
      query: () => "Employee/EmpDetails",
      transformResponse: (res) => {
        if (res.StatusCode !== 200) return employeeAdapter.setAll(initialState, []);
        const newData = res.ResultSet.map((emp) => ({
          ...emp,
          id: emp.hed_Employee_id,
        }));
        return employeeAdapter.setAll(initialState, newData);
      },
      providesTags: (result) =>
        result?.ids
          ? [{ type: "Employee", id: "LIST" }, ...result.ids.map((id) => ({ type: "Employee", id }))]
          : [{ type: "Employee", id: "LIST" }],
    }),

    // ===== READ EMPLOYEE BY ID =====
    getEmployeeById: builder.query({
      query: (id) => `Employee/Getempbyid?id=${id}`,
      providesTags: (result, error, id) => [{ type: "Employee", id }],
    }),

    // ===== CREATE EMPLOYEE =====
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "Employee/CreateEmployee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),

    // ===== UPDATE EMPLOYEE =====
    updateEmployee: builder.mutation({
      query: (data) => ({
        url: `Employee/UpdateEmployee/${data.hed_Employee_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Employee", id: arg.hed_Employee_id }],
    }),

    // ===== DELETE EMPLOYEE =====
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `Employee/DeleteEmployee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Employee", id }],
    }),

    // ===== DROPDOWN ENDPOINTS =====
    getDepartments: builder.query({
      query: () => "Employee/GetDepartments",
    }),
    getLocationsByDepartment: builder.query({
      query: (deptId) => `Employee/GetLocationsByDepartment?deptId=${deptId}`,
    }),
    getDesignations: builder.query({
      query: () => "Employee/GetDesignations",
    }),
    getEducations: builder.query({
      query: () => "Employee/GetEducations",
    }),
    getHometowns: builder.query({
      query: () => "Employee/GetHometowns",
    }),
  }),
});

// ------------------- SELECTORS -------------------
export const selectReadEmployeeResult = EmployeeApiSlice.endpoints.readEmployees.select();
const selectReadEmployeeData = createSelector(
  selectReadEmployeeResult,
  (emp) => emp.data
);

export const { selectAll: selectAllEmployee, selectById: selectEmployeeById } =
  employeeAdapter.getSelectors((state) => selectReadEmployeeData(state) ?? initialState);

// ------------------- EXPORT HOOKS -------------------
export const {
  useReadEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetDepartmentsQuery,
  useGetLocationsByDepartmentQuery,
  useGetDesignationsQuery,
  useGetEducationsQuery,
  useGetHometownsQuery,
} = EmployeeApiSlice;
