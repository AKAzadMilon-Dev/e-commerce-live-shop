import {Navbar, Container, Nav} from 'react-bootstrap';
import Home from './components/Home';
import Products from './components/Products';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">LIVE SHOP</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto menu">
                <Link to="/home">Home</Link>
                <Link to="/products">Products</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/products/:slug" element={<ProductDetails />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
