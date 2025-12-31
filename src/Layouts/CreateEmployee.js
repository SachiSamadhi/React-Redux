import React, { useState, useEffect } from "react";
import { useCreateEmpMutation } from "./EmployeeApiSlice";

const CreateEmployee = () => {
  const [createEmp, { isLoading, isSuccess, isError, error }] = useCreateEmpMutation();

  const [formData, setFormData] = useState({
    Name: "",
    Address: "",
    DepartmentId: "",
    LocationId: "",
    DesignationId: "",
    EducationId: "",
  });

  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [educations, setEducations] = useState([]);

  // Load dropdowns
  useEffect(() => {
    fetch("https://localhost:5001/api/Dropdown/Departments")
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(err => console.error(err));

    fetch("https://localhost:5001/api/Dropdown/Educations")
      .then(res => res.json())
      .then(data => setEducations(data))
      .catch(err => console.error(err));

    fetch("https://localhost:5001/api/Dropdown/Designations")
      .then(res => res.json())
      .then(data => setDesignations(data))
      .catch(err => console.error(err));
  }, []);

  // Load locations when department changes
  useEffect(() => {
    setLocations([]); // Clear locations when department changes
    setFormData(prev => ({ ...prev, LocationId: "" }));

    if (!formData.DepartmentId) return;

    fetch(`https://localhost:5001/api/Dropdown/Locations/${formData.DepartmentId}`)
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error(err));
  }, [formData.DepartmentId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createEmp({
      hed_Employee_Name: formData.Name,
      hed_Employee_Hometown: formData.Address,
      hdd_Department_id: formData.DepartmentId,
      hld_location_id: formData.LocationId,
      hdd_Designation_id: formData.DesignationId,
      hed_Education_id: formData.EducationId,
    });

    setFormData({
      Name: "",
      Address: "",
      DepartmentId: "",
      LocationId: "",
      DesignationId: "",
      EducationId: "",
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add New Employee</h2>
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

          {/* Department */}
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

          {/* Location */}
          <select
            style={styles.input}
            name="LocationId"
            value={formData.LocationId}
            onChange={handleChange}
            required
            disabled={!locations.length}
          >
            <option value="">Select Location</option>
            {locations.map(loc => (
              <option key={loc.hld_location_id} value={loc.hld_location_id}>
                {loc.hld_location_Name}
              </option>
            ))}
          </select>

          {/* Designation */}
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

          {/* Education */}
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

          <button style={styles.button} type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Create Employee"}
          </button>
        </form>

        {isSuccess && <p style={styles.success}>Employee Created Successfully!</p>}
        {isError && <p style={styles.error}>{error?.data?.message || "Error creating employee"}</p>}
      </div>
    </div>
  );
};

export default CreateEmployee;




