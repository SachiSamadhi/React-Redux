import React from "react";
import { useReadEmployeeQuery, selectAllEmployee } from "./EmployeeApiSlice";
import { useSelector } from "react-redux";
import EmployeeRow from "./EmployeeRow";

const ReadEmployee = () => {
  const { isLoading, isError, error } = useReadEmployeeQuery();
  const employees = useSelector(selectAllEmployee); // <-- array from entity adapter

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Loading Employees...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger mt-4">
        {error?.data?.message || "Failed to load employees"}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Employee List</h4>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Full Name</th>
                <th>Home Address</th>
                <th>Department</th>
                <th>Department Location</th>
                <th>Designation</th>
                <th>Education Level</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <EmployeeRow key={emp.id} emp={emp} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReadEmployee;
