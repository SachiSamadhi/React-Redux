import { useDeleteEmployeeMutation } from "../../services/EmployeeApiSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectEmployeeById } from "../../services/EmployeeApiSlice";

const Employee = ({ employeeId }) => {
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();

  const employee = useSelector(state => selectEmployeeById(state, employeeId));

  if (!employee) return null;

  const handleDelete = async () => {
    if (window.confirm("Delete this employee?")) {
      try {
        await deleteEmployee(employee.hed_Employee_id).unwrap();
      } catch (err) {
        console.error("Failed to delete:", err);
      }
    }
  };

  return (
    <tr>
      <td>{employee.hed_Employee_Name}</td>
      <td>{employee.hed_Employee_Hometown}</td>
      <td>{employee.Department?.hdd_Department_Name || "-"}</td>
      <td>{employee.Location?.hld_location_Name || "-"}</td>
      <td>{employee.Designation?.hdd_Designation_Name || "-"}</td>
      <td>{employee.Education?.hed_Education_Name || "-"}</td>

      <td className="text-center">
        <Link to={`/update-employee/${employee.hed_Employee_id}`}>
          <button className="btn btn-warning btn-sm me-2">Edit</button>
        </Link>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Employee;
