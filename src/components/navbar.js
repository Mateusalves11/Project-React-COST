import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Company from './pages/Company';
import NovoProjeto from './pages/NovoProjeto';
import Projects from './pages/projects';
import Edit from './pages/projectedit';

function NavbarW(){
return (
    <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <img width="40px" src="../costs_logo.png" alt="" />
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
            <Link to="/"><Nav.Link href="#Home">Home</Nav.Link></Link>
            <Link to="Contact"><Nav.Link href="#Contato">Contato</Nav.Link></Link>
            <Link to="/NewProject"><Nav.Link href="#NewProject">Novo Projeto</Nav.Link></Link>
            <Link to="/Company"><Nav.Link href="#Company">Empresa</Nav.Link></Link>
            <Link to="/Projects"><Nav.Link href="#projects">Projetos</Nav.Link></Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Contact" element={<Contact />} />
            <Route exact path="/Company" element={<Company />} />
            <Route exact path="/NewProject" element={<NovoProjeto />} />
            <Route exact path="/projects" element={<Projects />} />
            <Route exact path="/projects/:id" element={<Edit/>}/>
        </Routes>
    </Router>
  );
}

export default NavbarW;