import { useParams, useNavigate } from "react-router-dom";
import { selectEmployeeById, useUpdateEmpMutation } from "./EmployeeApiSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const employee = useSelector(state => selectEmployeeById(state, id));
  const [updateEmp] = useUpdateEmpMutation();
  
  const [formData, setFormData] = useState({
    Name: "",
    Address: "",
    DepartmentId: "",
    LocationId: "",
    DesignationId: "",
    EducationId: ""
  });

  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [educations, setEducations] = useState([]);

  // Load dropdowns
  useEffect(() => {
    fetch("https://localhost:5001/api/Dropdown/Departments")
      .then(res => res.json())
      .then(data => setDepartments(data));

    fetch("https://localhost:5001/api/Dropdown/Educations")
      .then(res => res.json())
      .then(data => setEducations(data));

    fetch("https://localhost:5001/api/Dropdown/Designations")
      .then(res => res.json())
      .then(data => setDesignations(data));
  }, []);

  // Set employee data to form
  useEffect(() => {
    if (employee) {
      setFormData({
        Name: employee.hed_Employee_Name || "",
        Address: employee.hed_Employee_Hometown || "",
        DepartmentId: employee.hdd_Department_id || "",
        LocationId: employee.hld_location_id || "",
        DesignationId: employee.hdd_Designation_id || "",
        EducationId: employee.hed_Education_id || ""
      });
    }
  }, [employee]);

  // Load locations when department changes
  useEffect(() => {
    if (!formData.DepartmentId) return;
    fetch(`https://localhost:5001/api/Dropdown/Locations/${formData.DepartmentId}`)
      .then(res => res.json())
      .then(data => setLocations(data));
  }, [formData.DepartmentId]);

  if (!employee) return <p style={{textAlign:"center"}}>Loading...</p>;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await updateEmp({
      hed_Employee_id: id,
      hed_Employee_Name: formData.Name,
      hed_Employee_Hometown: formData.Address,
      hdd_Department_id: formData.DepartmentId,
      hld_location_id: formData.LocationId,
      hdd_Designation_id: formData.DesignationId,
      hed_Education_id: formData.EducationId
    }).unwrap();
    alert("Employee Updated Successfully");
    navigate("/ReadEmployee");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Update Employee</h2>

        <form onSubmit={handleSubmit} style={styles.formGrid}>
          <input
            style={styles.input}
            name="Name"
            placeholder="Full Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            name="Address"
            placeholder="Home Address"
            value={formData.Address}
            onChange={handleChange}
            required
          />

          <select
            style={styles.input}
            name="DepartmentId"
            value={formData.DepartmentId}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept.hdd_Department_id} value={dept.hdd_Department_id}>
                {dept.hdd_Department_Name}
              </option>
            ))}
          </select>

          <select
            style={styles.input}
            name="LocationId"
            value={formData.LocationId}
            onChange={handleChange}
            required
            disabled={!formData.DepartmentId}
          >
            <option value="">Select Location</option>
            {locations.map(loc => (
              <option key={loc.hld_location_id} value={loc.hld_location_id}>
                {loc.hld_location_Name}
              </option>
            ))}
          </select>

          <select
            style={styles.input}
            name="DesignationId"
            value={formData.DesignationId}
            onChange={handleChange}
            required
          >
            <option value="">Select Designation</option>
            {designations.map(des => (
              <option key={des.hdd_Designation_id} value={des.hdd_Designation_id}>
                {des.hdd_Designation_Name}
              </option>
            ))}
          </select>

          <select
            style={styles.input}
            name="EducationId"
            value={formData.EducationId}
            onChange={handleChange}
            required
          >
            <option value="">Select Education</option>
            {educations.map(edu => (
              <option key={edu.hed_Education_id} value={edu.hed_Education_id}>
                {edu.hed_Education_Name}
              </option>
            ))}
          </select>

          <button style={styles.button} type="submit">
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;


