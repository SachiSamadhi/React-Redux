import {
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_UPDATE_FAIL
} from "../constants/employeeConstants";

import EmployeeService from "../services/EmployeeService";

export const updateEmployee = (id, employeeData) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_UPDATE_REQUEST });

    const { data } = await EmployeeService.updateEmployee(id, employeeData);

    dispatch({
      type: EMPLOYEE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_UPDATE_FAIL,
      payload:
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "Failed to update employee",
    });
  }
};
