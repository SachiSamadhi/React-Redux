import {
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_CREATE_FAIL,
  EMPLOYEE_READ_REQUEST,
  EMPLOYEE_READ_SUCCESS,
  EMPLOYEE_READ_FAIL,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_UPDATE_FAIL,
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_DELETE_FAIL,
  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_LIST_FAIL,
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_SUCCESS,
  LOCATION_LIST_FAIL,
  DESIGNATION_LIST_REQUEST,
  DESIGNATION_LIST_SUCCESS,
  DESIGNATION_LIST_FAIL,
  EDUCATION_LIST_REQUEST,
  EDUCATION_LIST_SUCCESS,
  EDUCATION_LIST_FAIL
} from "../constants/employeeConstants";

const initialState = {
  employees: [],
  employeeLoading: false,
  employeeError: null,
  departments: [],
  locations: [],
  designations: [],
  educations: []
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {

    /* =================== CREATE =================== */
    case EMPLOYEE_CREATE_REQUEST:
      return { ...state, employeeLoading: true, employeeError: null };
    case EMPLOYEE_CREATE_SUCCESS:
      return {
        ...state,
        employeeLoading: false,
        employees: [...state.employees, action.payload],
        employeeError: null
      };
    case EMPLOYEE_CREATE_FAIL:
      return { ...state, employeeLoading: false, employeeError: action.payload?.msg };

    /* =================== READ =================== */
    case EMPLOYEE_READ_REQUEST:
      return { ...state, employeeLoading: true, employeeError: null };
    case EMPLOYEE_READ_SUCCESS:
      return { ...state, employeeLoading: false, employees: action.payload, employeeError: null };
    case EMPLOYEE_READ_FAIL:
      return { ...state, employeeLoading: false, employeeError: action.payload?.msg };

    /* =================== UPDATE =================== */
    case EMPLOYEE_UPDATE_REQUEST:
      return { ...state, employeeLoading: true, employeeError: null };
    case EMPLOYEE_UPDATE_SUCCESS:
      return {
        ...state,
        employeeLoading: false,
        employees: state.employees.map(emp =>
          emp.hed_Employee_id === action.payload.hed_Employee_id ? action.payload : emp
        ),
        employeeError: null
      };
    case EMPLOYEE_UPDATE_FAIL:
      return { ...state, employeeLoading: false, employeeError: action.payload?.msg };

    /* =================== DELETE =================== */
    case EMPLOYEE_DELETE_REQUEST:
      return { ...state, employeeLoading: true, employeeError: null };
    case EMPLOYEE_DELETE_SUCCESS:
      return {
        ...state,
        employeeLoading: false,
        employees: state.employees.filter(emp => emp.hed_Employee_id !== action.payload),
        employeeError: null
      };
    case EMPLOYEE_DELETE_FAIL:
      return { ...state, employeeLoading: false, employeeError: action.payload?.msg };

    /* =================== DROPDOWNS =================== */
    case DEPARTMENT_LIST_REQUEST:
      return { ...state };
    case DEPARTMENT_LIST_SUCCESS:
      return { ...state, departments: action.payload };
    case DEPARTMENT_LIST_FAIL:
      return { ...state, employeeError: action.payload?.msg };

    case LOCATION_LIST_REQUEST:
      return { ...state };
    case LOCATION_LIST_SUCCESS:
      return { ...state, locations: action.payload };
    case LOCATION_LIST_FAIL:
      return { ...state, employeeError: action.payload?.msg };

    case DESIGNATION_LIST_REQUEST:
      return { ...state };
    case DESIGNATION_LIST_SUCCESS:
      return { ...state, designations: action.payload };
    case DESIGNATION_LIST_FAIL:
      return { ...state, employeeError: action.payload?.msg };

    case EDUCATION_LIST_REQUEST:
      return { ...state };
    case EDUCATION_LIST_SUCCESS:
      return { ...state, educations: action.payload };
    case EDUCATION_LIST_FAIL:
      return { ...state, employeeError: action.payload?.msg };

    default:
      return state;
  }
};
