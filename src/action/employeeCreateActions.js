import {
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_CREATE_FAIL
} from "../constants/employeeConstants";

import EmployeeService from "../services/EmployeeService";

// Redux thunk for creating an employee
export const createEmployee = (employeeData) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_CREATE_REQUEST });

    // Call the API
    const response = await EmployeeService.createEmployee(employeeData);

    // Axios returns response.data
    const data = response.data;

    dispatch({
      type: EMPLOYEE_CREATE_SUCCESS,
      payload: data, // contains StatusCode, Result, etc.
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_CREATE_FAIL,
      payload:
        error.response?.data?.Result || error.message || "Failed to create employee",
    });
  }
};
