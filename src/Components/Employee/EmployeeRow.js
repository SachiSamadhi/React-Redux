import { useDeleteEmployeeMutation } from "../../services/EmployeeApiSlice";
import { Link } from "react-router-dom";

const EmployeeRow = ({ emp }) => {
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const onDelete = async () => {
    if (window.confirm("Delete this employee?")) {
      await deleteEmployee(emp.id); // pass id directly
    }
  };

  return (
    <tr>
      <td>{emp.name}</td>
      <td>{emp.address}</td>
      <td>{emp.department}</td>
      <td>{emp.departmentLocation}</td>
      <td>{emp.designation}</td>
      <td>{emp.education}</td>
      <td>
        <Link to={`/edit/${emp.id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={onDelete} style={{ marginLeft: 10, color: "red" }}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EmployeeRow;
