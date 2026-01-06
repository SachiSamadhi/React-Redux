import React from 'react';

const EmployeeRow = ({ emp }) => (
  <tr>
    <td>{emp.hed_Employee_Name}</td>
    <td>{emp.hed_Employee_Hometown}</td>
    <td>{emp.hdd_Department_Name}</td>
    <td>{emp.hld_location_Name}</td>
    <td>{emp.hed_Designation}</td>
    <td>{emp.hed_Education}</td>
    <td>{emp.hed_Phone}</td>
    <td>{emp.hed_Email}</td>
    
  </tr>
);

export default EmployeeRow;
