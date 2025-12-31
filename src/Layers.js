import { Link, Outlet } from 'react-router-dom';

const Layers = () =>{
    return(
    <>
    <nav>
      <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/ReadEmployee">Employee List</Link>
        </li>
        <li>
            <Link to="/CreateEmployee">Create new Employee</Link>
        </li>
      </ul>

    </nav>
    <Outlet/>
    
    </>
    )
}
export default Layers;