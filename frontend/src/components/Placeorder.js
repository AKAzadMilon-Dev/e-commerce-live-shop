import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {Container, Row, Col,Card,Button,Modal,Form, Table,ListGroup, Toast} from 'react-bootstrap';
import CheckoutStep from './CheckoutStep';
import { Store } from '../Store';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';


const reducer = (state, action)=>{
  switch(action.type){
    case 'CREATE_REQUEST':
      return{...state,loading:true}
    case 'CREATE_SUCCESS':
      return{...state,loading:false}
    case 'CREATE_FAIL':
      return{...state,loading:false}
  }
}

const Placeorder = () => {

  const navigate = useNavigate()

  // Modals start
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Modals end
  // Modals start
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  // Modals end

  const [{loading,error}, placeorder_dispatch] = useReducer(reducer,{
    loading: false,
    error:""
  })

  const {state, dispatch,ctxdispatch,state3, state4,dispatch4,state5,dispatch5} = useContext(Store)

  const [fullname, setFullname] = useState(state4.shippingInfo.fullname || "")
  const [address, setAddress] = useState(state4.shippingInfo.address || "")
  const [city, setCity] = useState(state4.shippingInfo.city || "")
  const [postcode, setPostcode] = useState(state4.shippingInfo.postcode || "")
  const [country, setCountry] = useState(state4.shippingInfo.country || "")
  const [total, setTotal] = useState("")

  const {userInfo} = state3
  console.log(userInfo)

  let [paymentMethhod, setPaymentMethod] = useState(state5.paymentMethod?state5.paymentMethod:"")

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch4({
        type: "SHIPPING_ADDRESS",
        payload:{
            fullname,
            address,
            city,
            postcode,
            country
        }
    })
    localStorage.setItem("shippingInfo", JSON.stringify({
        fullname,
        address,
        city,
        postcode,
        country
    }))
    setShow(false)
}

// Payment Method
const handleSubmitPayment = (e)=>{
  e.preventDefault()
  dispatch5({type:'PAYMENT_METHOD',payload:paymentMethhod})
  localStorage.setItem('paymentMethod',JSON.stringify(paymentMethhod))
  setShow2(false)
}

const updateCart = (item, quantity)=>{
  console.log(quantity)
  dispatch({
      type: 'ADD_CART_ITEM',
      payload: {...item, quantity}
  })
}

const handleRemove = (item)=>{
  placeorder_dispatch({
      type: 'CART_REMOVE_ITEM',
      payload: item
  })
}

const handlePlaceOrder = async ()=>{
  try{
    const {data} = await axios.post('api/orders',
      {
        orderItems:state.cart.cartItems,
        shippingInfo:state4.shippingInfo,
        paymentMethhod:state5.paymentMethod,
        deleveryPrice:0,
        productPrice:total,
        taxPrice:total<500?0:(total*5)/100,
        totalPrice:total+(total<500?0:(+30))+(total<500?0:(total*5)/100)

      },
      {
        headers:{
          authorization: `Bearer${userInfo.token}`
        }
      }
    )

    ctxdispatch({type: 'CLEAR_CART'})
    dispatch({type:'CREATE_SUCCESS'})
    localStorage.removeItem('cartItems')
    navigate(`/order/${data.order._id}`)

  }catch(error){
    dispatch({type:'CREATE_FAIL'})
    toast.error(error)
  }
}

useEffect(()=>{
  const total = state.cart.cartItems.reduce((accumulator, current)=>accumulator + current.price * current.quantity, 0)
  console.log(total)
  setTotal(total)
},[state.cart.cartItems])

  return (
    <>
      <Helmet>
        <title>Place Order</title>
      </Helmet>
      <CheckoutStep step1='true' step2='true' step3='true' step4='true'/>
      <Container className='mt-5'>
        <h3>Preview Order</h3>
        <Row>
          <Col lg={8}>
          {/* Shipping Address Card Start */}
          <Card className='mt-3'>
            <Card.Body>
              <Card.Title>Shipping Address</Card.Title><hr/>
              <Card.Text>
                <b>Name :</b> {state4.shippingInfo.fullname}<br/>
                <b>Adderss :</b> {state4.shippingInfo.address}<br/>
                <b>City :</b> {state4.shippingInfo.city}<br/>
                <b>Post-Code :</b> {state4.shippingInfo.postcode}<br/>
                <b>Country :</b> {state4.shippingInfo.country}<br/>
              </Card.Text>
              {/* <Link to={'/shipping'}>Edit</Link> */}
              <Button onClick={handleShow} className='ms-5' variant="primary">Edit Shipping</Button>
            </Card.Body>
          </Card>
          {/* Shipping Address Card End */}

          {/* Payment Method card start */}
          <Card className='mt-5'>
            <Card.Body>
              <Card.Title>Payment Method</Card.Title><hr/>
              <Card.Text>
                <b>Payment method :</b> {state5.paymentMethod}<br/>
              </Card.Text>
              {/* <Link to={'/payment'}>Edit</Link> */}
              <Button onClick={handleShow2} className='ms-5' variant="primary">Edit Payment</Button>
            </Card.Body>
          </Card>
          {/* payment Method Card end */}

          {/* Order Item card start */}
          <Card className='mt-5'>
            <Card.Body>
              <Card.Title>Order Item</Card.Title><hr/>
              <Card.Text>
                <b>Total Items :</b> {state.cart.cartItems.length}<br/>
              </Card.Text>

              <Table className='cartTd' striped bordered hover variant="primary">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Stock Status</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                {state.cart.cartItems.map((item)=>(
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
                      <td>{item.inStock}</td>
                      <td><Button onClick={()=>handleRemove(item)} variant="danger">Delete</Button></td>
                    </tr>
                  </tbody>
                ))}
              </Table>

              <Link to={'/cartpage'}>Edit</Link>
              {/* <Button onClick={handleShow2} className='ms-5' variant="primary">Edit Payment</Button> */}
            </Card.Body>
          </Card>
          {/* Order Item Card end */}
          </Col>

          {/* Payment Method card start */}
          <Col lg={4}>
            <Card className='mt-3'>
              <Card.Body>
                <Card.Title>Payment Summary</Card.Title><hr/>
                <Card.Text>
                  <ListGroup>
                    <ListGroup.Item><b>Product Price: </b>${total}</ListGroup.Item>
                    <ListGroup.Item><b>Delevery Charge: </b>${total<500?0:(+30)}</ListGroup.Item>
                    <ListGroup.Item><b>Tax: </b>${total<500?0:(total*5)/100}</ListGroup.Item>
                    <ListGroup.Item><b>Total Price: </b>${total+(total<500?0:(+30))+(total<500?0:(total*5)/100)}</ListGroup.Item>
                  </ListGroup>
                </Card.Text>
                <Button onClick={handlePlaceOrder} variant="primary">Place Order</Button>
              </Card.Body>
            </Card>
          </Col>
          {/* payment Method Card end */}
        </Row>
      </Container>

      {/* Modals Shipping Address Start */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Shipping Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" >
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control onChange={(e)=>setFullname(e.target.value)} type="text" placeholder="Enter Your Full Name" value={fullname} />
              </Form.Group>
              <Form.Group className="mb-3" >
                  <Form.Label>Address</Form.Label>
                  <Form.Control onChange={(e)=>setAddress(e.target.value)} type="text" placeholder="Your Address Here" value={address}/>
              </Form.Group>
              <Form.Group className="mb-3" >
                  <Form.Label>City</Form.Label>
                  <Form.Control onChange={(e)=>setCity(e.target.value)} type="text" placeholder="Your City" value={city}/>
              </Form.Group>
              <Form.Group className="mb-3" >
                  <Form.Label>Postal code</Form.Label>
                  <Form.Control onChange={(e)=>setPostcode(e.target.value)} type="text" placeholder="Postal code" value={postcode}/>
              </Form.Group>
              <Form.Group className="mb-3" >
                  <Form.Label>Country</Form.Label>
                  <Form.Control onChange={(e)=>setCountry(e.target.value)} type="text" placeholder="Country" value={country}/>
              </Form.Group>
              <div className="d-grid gap-2">
                  <Button type='submit' variant="primary" size="md">Continue</Button>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      {/* Modals Shipping Address End */}

      {/* Modals Payment Method Start */}
        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Payment Method</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitPayment}>  
              <Form.Check 
                  type="radio"
                  id="paypal"
                  label="Paypal"
                  value="Paypal"
                  checked={paymentMethhod == "Paypal"}
                  onChange={(e)=> setPaymentMethod(e.target.value)}
              />
              <Form.Check 
                  type="radio"
                  id="strip"
                  label="Strip"
                  value="Strip"
                  checked={paymentMethhod == "Strip"}
                  onChange={(e)=> setPaymentMethod(e.target.value)}
              />
              <Form.Check 
                  type="radio"
                  id="sslcommerz"
                  label="SSLcommerz"
                  value="SSLcommerz"
                  checked={paymentMethhod == "SSLcommerz"}
                  onChange={(e)=> setPaymentMethod(e.target.value)}
              />
              <div className="d-grid gap-2 mt-3">
                  <Button onClick={handleSubmitPayment} type='submit' variant="primary" size="md">
                      Continue
                  </Button>
                  <Button variant="secondary" onClick={handleClose2}>Close</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      {/* Modals Payment Method End */}
    </>
  )
}

export default Placeorder