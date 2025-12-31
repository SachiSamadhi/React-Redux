import {
  EDUCATION_LIST_REQUEST,
  EDUCATION_LIST_SUCCESS,
  EDUCATION_LIST_FAIL
} from "../constants/employeeConstants";

import EmployeeService from "../services/EmployeeService";

export const listEducations = () => async (dispatch) => {
  try {
    dispatch({ type: EDUCATION_LIST_REQUEST });

    const { data } = await EmployeeService.getEducations();

    dispatch({
      type: EDUCATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDUCATION_LIST_FAIL,
      payload:
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "Failed to fetch educations",
    });
  }
};
