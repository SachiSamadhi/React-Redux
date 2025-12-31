import {
  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_LIST_FAIL
} from "../constants/employeeConstants";

import EmployeeService from "../services/EmployeeService";

export const listDepartments = () => async (dispatch) => {
  try {
    dispatch({ type: DEPARTMENT_LIST_REQUEST });

    const { data } = await EmployeeService.getDepartments();

    dispatch({
      type: DEPARTMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEPARTMENT_LIST_FAIL,
      payload:
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "Failed to fetch departments",
    });
  }
};
