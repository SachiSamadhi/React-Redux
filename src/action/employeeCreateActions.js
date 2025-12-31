import {
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_CREATE_FAIL
} from "../constants/employeeConstants";

import EmployeeService from "../services/EmployeeService";

export const createEmployee = (employeeData) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_CREATE_REQUEST });

    const { data } = await EmployeeService.createEmployee(employeeData);

    dispatch({
      type: EMPLOYEE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_CREATE_FAIL,
      payload:
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "Failed to create employee",
    });
  }
};
