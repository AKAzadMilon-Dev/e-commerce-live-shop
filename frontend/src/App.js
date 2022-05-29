import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom";
import {Navbar, Container, Nav, Badge,NavDropdown,Button, Dropdown, Offcanvas, Table} from 'react-bootstrap';
import Home from './components/Home';
import Products from './components/Products';

import ProductDetails from './components/ProductDetails';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartPage from './components/CartPage';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import { FaFirstOrder } from "react-icons/fa";
import Wishlist from './components/Wishlist';
import Compare from './components/Compare';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Shipping from './components/Shipping';
import Payment from './components/Payment';
import Placeorder from "./components/Placeorder";
import OrderPage from "./components/OrderPage";
import MyOrder from "./components/MyOrder";
import Dashboard from "./components/Dashboard";
import Vendor from "./components/Vendor";

function App() {
  // const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {state, dispatch,state2,dispatch2,state3,dispatch3} = useContext(Store)
  const {cart:{cartItems}} = state
  const {wishList:{wishListItems}} = state2
  const {userInfo} = state3

  console.log(userInfo)
    
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

  const handleWishlistRemove = (item)=>{
      dispatch2({
          type: 'WISHLIST_REMOVE_ITEM',
          payload: item
      })
  }

  const handleSignout = ()=>{
    dispatch3({type: "USER_SIGNIN"})
    localStorage.removeItem("userInfo")
  }
  
  // useEffect(()=>{
  //   if(userInfo){
  //     navigate('/')
  //   }
  // },[])


  console.log("user",userInfo)



  return  <>



<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      {/* React-Toastify Start */}
      <ToastContainer 
        position="bottom-center"
        autoClose={4000}
        limit={1}
      />
      {/* React-Toastify End */}
      <Navbar.Brand href="#home"><FaFirstOrder className='navIcon'/>LIVE SHOP</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto menu">
          <Link className='item' to="/">Home</Link>
          <Link className='item' to="/products">Products</Link>
          <Link className='item' to="/compare">Compare Products</Link>
          
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
            {state.cart.cartItems.length > 0 && (
              <Badge pill bg="success">
                {state.cart.cartItems.length}
              </Badge>
            )}

            {/* wishlist start */}
            <NavDropdown title="Wishlist" >
          <Table className='cartTd' striped bordered hover variant="primary">
            {wishListItems.map((item)=>(
                <tbody >
                    <tr>
                        <td><Link to={`/products/${item.slug}`}>{item.name}</Link></td>
                        <td>
                            <img width="50" src={item.img}></img>
                        </td>
                        <td>$ {item.price}</td>
                        <td><Button onClick={()=>handleWishlistRemove(item)} variant="danger">Delete</Button></td>
                    </tr>
                </tbody>
            ))}
        </Table>

            <Link to="/wishlist">
              <div>
                <Button className='w-100' >Go to wishlist</Button>
              </div>
            </Link>

          </NavDropdown>
            {state2.wishList.wishListItems.length > 0 && (
              <Badge pill bg="success">
                {state2.wishList.wishListItems.length}
              </Badge>
            )}
            {/* wishlist end */}

            {/* Sign In and Sign Out Start */}
            {userInfo ? 
            <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
              {userInfo.isVendor
              ?
              <NavDropdown.Item href="#action/3.1">
                <Link className='item' to="/dashboard">Dashboard</Link>
              </NavDropdown.Item>
              :
              <NavDropdown.Item href="#action/3.1">
                <Link className='item' to="/vendor">Become A Vendor</Link>
              </NavDropdown.Item>
              }
              
              
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">My Orders</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" onClick={handleSignout}>Sign Out</NavDropdown.Item>
            </NavDropdown>
            :
            <Link className='item' to="/signin">Sign In</Link>
            }
              {/* Sign In and Sign Out End */}
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
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/wishlist" element={<Wishlist/>}/>
    <Route path="/compare" element={<Compare/>}/>
    <Route path="/shipping" element={<Shipping/>}/>
    <Route path="/payment" element={<Payment/>}/>
    <Route path="/placeorder" element={<Placeorder/>}/>
    <Route path="/orders/:id" element={<OrderPage/>}/>
    <Route path="/myorders" element={<MyOrder/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/vendor" element={<Vendor/>}/>
  </Routes>
</>
}

export default App;
