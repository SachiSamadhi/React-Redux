import {
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_SUCCESS,
  LOCATION_LIST_FAIL
} from "../constants/employeeConstants";

import EmployeeService from "../services/EmployeeService";

export const listLocations = (deptId) => async (dispatch) => {
  try {
    dispatch({ type: LOCATION_LIST_REQUEST });

    const { data } = await EmployeeService.getLocations(deptId);

    dispatch({
      type: LOCATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOCATION_LIST_FAIL,
      payload:
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "Failed to fetch locations",
    });
  }
};
