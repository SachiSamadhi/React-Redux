import {
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_DELETE_FAIL
} from "../constants/employeeConstants";

import EmployeeService from "../services/EmployeeService";

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_DELETE_REQUEST });

    await EmployeeService.deleteEmployee(id);

    dispatch({
      type: EMPLOYEE_DELETE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_DELETE_FAIL,
      payload:
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "Failed to delete employee",
    });
  }
};
