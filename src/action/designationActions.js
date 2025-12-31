import {
  DESIGNATION_LIST_REQUEST,
  DESIGNATION_LIST_SUCCESS,
  DESIGNATION_LIST_FAIL
} from "../constants/employeeConstants";

import EmployeeService from "../services/EmployeeService";

export const listDesignations = () => async (dispatch) => {
  try {
    dispatch({ type: DESIGNATION_LIST_REQUEST });

    const { data } = await EmployeeService.getDesignations();

    dispatch({
      type: DESIGNATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DESIGNATION_LIST_FAIL,
      payload:
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "Failed to fetch designations",
    });
  }
};
