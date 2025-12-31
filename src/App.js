import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layouts from './Layouts/Layouts';
import Home from './Layouts/Home';
import ReadEmployee from './features/employee/ReadEmployee';
import CreateEmployee from './features/employee/CreateEmployee';
import UpdateEmployee from './features/employee/UpdateEmployee';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import logo from './assets/dockyard-logo.png';

function App() {
  return (
    <BrowserRouter>

      <Navbar expand="lg" fixed="top" className="dockyard-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-box">
            <img src={logo} alt="Dockyard Logo" className="dockyard-logo"/>
            <div>
              <h6 className="brand-title">COLOMBO DOCKYARD PLC</h6>
              
            </div>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto dockyard-links">

              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/ReadEmployee">Employees</Nav.Link>
              <Nav.Link as={Link} to="/CreateEmployee">Add Employee</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ paddingTop: "90px" }}>
        <Routes>
          <Route path="/" element={<Layouts />} />
          <Route index element={<Home />} />
          <Route path="/ReadEmployee" element={<ReadEmployee />} />
          <Route path="/CreateEmployee" element={<CreateEmployee />} />
          <Route path="/update-employee/:id" element={<UpdateEmployee />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
