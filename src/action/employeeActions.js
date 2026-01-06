import { EmployeeService } from '../services/EmployeeService';
import {
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_CREATE_FAIL,
  EMPLOYEE_READ_REQUEST,
  EMPLOYEE_READ_SUCCESS,
  EMPLOYEE_READ_FAIL,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_LIST_FAIL,
  LOCATION_LIST_SUCCESS,
  LOCATION_LIST_FAIL,
  DESIGNATION_LIST_SUCCESS,
  DESIGNATION_LIST_FAIL,
  EDUCATION_LIST_SUCCESS,
  EDUCATION_LIST_FAIL,
  HOMETOWN_LIST_SUCCESS,
  HOMETOWN_LIST_FAIL
} from "../constants/employeeConstants";

// ------------------ READ EMPLOYEES ------------------
export const readEmployees = () => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_READ_REQUEST });
    const { data } = await EmployeeService.getEmployees();
    dispatch({ type: EMPLOYEE_READ_SUCCESS, payload: data.ResultSet || data });
  } catch (error) {
    dispatch({ type: EMPLOYEE_READ_FAIL, payload: error.message });
  }
};

// ------------------ CREATE EMPLOYEE ------------------
export const createEmployee = (employeeData) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_CREATE_REQUEST });
    const { data } = await EmployeeService.createEmployee(employeeData);
    dispatch({ type: EMPLOYEE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EMPLOYEE_CREATE_FAIL, payload: error.message });
  }
};

// ------------------ DROPDOWN ACTIONS ------------------
export const fetchDepartments = () => async (dispatch) => {
  try {
    const { data } = await EmployeeService.getDepartments();
    dispatch({ type: DEPARTMENT_LIST_SUCCESS, payload: data.ResultSet || data });
  } catch (error) {
    dispatch({ type: DEPARTMENT_LIST_FAIL, payload: error.message });
  }
};

export const fetchLocations = (deptId) => async (dispatch) => {
  try {
    const { data } = await EmployeeService.getLocationsByDepartment(deptId);
    dispatch({ type: LOCATION_LIST_SUCCESS, payload: data.ResultSet || data });
  } catch (error) {
    dispatch({ type: LOCATION_LIST_FAIL, payload: error.message });
  }
};

export const fetchDesignations = () => async (dispatch) => {
  try {
    const { data } = await EmployeeService.getDesignations();
    dispatch({ type: DESIGNATION_LIST_SUCCESS, payload: data.ResultSet || data });
  } catch (error) {
    dispatch({ type: DESIGNATION_LIST_FAIL, payload: error.message });
  }
};

export const fetchEducations = () => async (dispatch) => {
  try {
    const { data } = await EmployeeService.getEducations();
    dispatch({ type: EDUCATION_LIST_SUCCESS, payload: data.ResultSet || data });
  } catch (error) {
    dispatch({ type: EDUCATION_LIST_FAIL, payload: error.message });
  }
};

export const fetchHometowns = () => async (dispatch) => {
  try {
    const { data } = await EmployeeService.getHometowns();
    dispatch({ type: HOMETOWN_LIST_SUCCESS, payload: data.ResultSet || data });
  } catch (error) {
    dispatch({ type: HOMETOWN_LIST_FAIL, payload: error.message });
  }
};
