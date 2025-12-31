import axios from "axios";

const API_URL = "https://localhost:7054/api"; // matches your apiSlice base URL

/* ================= EMPLOYEE CRUD ================= */

const createEmployee = (data) => {
  return axios.post(`${API_URL}/Employees`, data);
};

const getEmployees = () => {
  return axios.get(`${API_URL}/Employees`);
};

const updateEmployee = (data) => {
  return axios.put(`${API_URL}/Employees/${data.hed_Employee_id}`, data);
};

const deleteEmployee = (id) => {
  return axios.delete(`${API_URL}/Employees/${id}`);
};


/* ================= DROPDOWNS ================= */

const getDepartments = () => {
  return axios.get(`${API_URL}/Dropdown/Departments`);
};

const getLocations = (deptId) => {
  return axios.get(`${API_URL}/Dropdown/Locations/${deptId}`);
};

const getDesignations = () => {
  return axios.get(`${API_URL}/Dropdown/Designations`);
};

const getEducations = () => {
  return axios.get(`${API_URL}/Dropdown/Educations`);
};


/* ================= EXPORT ================= */

const EmployeeService = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getDepartments,
  getLocations,
  getDesignations,
  getEducations
};

export default EmployeeService;
