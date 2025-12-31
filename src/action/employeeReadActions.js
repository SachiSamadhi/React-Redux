import {
  EMPLOYEE_READ_REQUEST,
  EMPLOYEE_READ_SUCCESS,
  EMPLOYEE_READ_FAIL
} from "../constants/employeeConstants";

import EmployeeService from "../services/EmployeeService";

export const readEmployees = () => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_READ_REQUEST });

    const { data } = await EmployeeService.getEmployees();

    dispatch({
      type: EMPLOYEE_READ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_READ_FAIL,
      payload:
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "Failed to fetch employees",
    });
  }
};
