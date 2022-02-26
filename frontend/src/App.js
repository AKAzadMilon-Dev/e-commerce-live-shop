import {Navbar, Container, Nav, Badge,NavDropdown,Button, Dropdown, Offcanvas, Table} from 'react-bootstrap';
import Home from './components/Home';
import Products from './components/Products';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import ProductDetails from './components/ProductDetails';
import { useContext, useState } from 'react';
import { Store } from './Store';
import CartPage from './components/CartPage';
import Signin from './components/auth/Signin';
import { FaFirstOrder } from "react-icons/fa";

function App() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {state, dispatch} = useContext(Store)
  const {cart:{cartItems}} = state
    
  const updateCart = (item, quantity)=>{
      console.log(quantity)
      dispatch({
          type: 'ADD_CART_ITEM',
          payload: {...item, quantity}
      })
  }

  const handleRemove = (item)=>{
      dispatch({
          type: 'CART_REMOVE_ITEM',
          payload: item
      })
  }

  return (
    <>
      <BrowserRouter>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home"><FaFirstOrder className='navIcon'/>LIVE SHOP</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto menu">
                <Link className='item' to="/">Home</Link>
                <Link className='item' to="/products">Products</Link>
                <NavDropdown title="Cart" >
                  
                <Table className='cartTd' striped bordered hover variant="primary">
                  {cartItems.map((item)=>(
                      <tbody >
                          <tr>
                              <td><Link to={`/products/${item.slug}`}>{item.name}</Link></td>
                              <td>
                                  <img width="50" src={item.img}></img>
                              </td>
                              <td>$ {item.price}</td>
                              <td>
                                  <Button onClick={()=>updateCart(item, item.quantity+1)} disabled={item.quantity == item.inStock} variant="success">+</Button>
                                      <span>{item.quantity}</span>
                                  <Button onClick={()=>updateCart(item, item.quantity-1)} disabled={item.quantity === 1} variant="success">-</Button>
                              </td>
                              <td><Button onClick={()=>handleRemove(item)} variant="danger">Delete</Button></td>
                          </tr>
                      </tbody>
                  ))}
              </Table>

                  <Link to="/cartpage">
                    <div>
                      <Button className='w-100' >Go to cart</Button>
                    </div>
                  </Link>

                </NavDropdown>
                  {state.cart.cartItems.length > 0 && 
                    <Badge pill bg="success">
                      {state.cart.cartItems.length}
                    </Badge>
                  }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* Offcanvas start */}
        <Button className='sideCart' variant="primary" onClick={handleShow}>Cart</Button>
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Table className='cartTd' striped bordered hover variant="primary">
              {cartItems.map((item)=>(
                  <tbody >
                      <tr>
                          <td>1</td>
                          <td><Link to={`/products/${item.slug}`}>{item.name}</Link></td>
                          <td>
                              <img width="50" src={item.img}></img>
                          </td>
                          <td>$ {item.price}</td>
                          <td>
                              <Button onClick={()=>updateCart(item, item.quantity+1)} disabled={item.quantity == item.inStock} variant="success">+</Button>
                                  <span>{item.quantity}</span>
                              <Button onClick={()=>updateCart(item, item.quantity-1)} disabled={item.quantity === 1} variant="success">-</Button>
                          </td>
                          <td>{item.inStock}</td>
                          <td><Button onClick={()=>handleRemove(item)} variant="danger">Delete</Button></td>
                      </tr>
                  </tbody>
              ))}
          </Table>
          <Link to="/cartpage">
                    <div>
                      <Button className='w-100' >Go to cart</Button>
                    </div>
                  </Link>
          </Offcanvas.Body>
        </Offcanvas>
        {/* Offcanvas End */}

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:slug" element={<ProductDetails/>}/>
          <Route path="/cartpage" element={<CartPage/>}/>
          <Route path="/signin" element={<Signin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
