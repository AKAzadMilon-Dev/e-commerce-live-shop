import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {Container, Row, Col,Card,Button,Modal,Form} from 'react-bootstrap';
import CheckoutStep from './CheckoutStep';
import { Store } from '../Store';
import { Link } from 'react-router-dom';

const Placeorder = () => {

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

  const {state4,dispatch4,state5,dispatch5} = useContext(Store)
  console.log(state5.paymentMethod)

  const [fullname, setFullname] = useState(state4.shippingInfo.fullname || "")
  const [address, setAddress] = useState(state4.shippingInfo.address || "")
  const [city, setCity] = useState(state4.shippingInfo.city || "")
  const [postcode, setPostcode] = useState(state4.shippingInfo.postcode || "")
  const [country, setCountry] = useState(state4.shippingInfo.country || "")

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
  setShow(false)
}

  return (
    <>
      <Helmet>
        <title>Place Order</title>
      </Helmet>
      <CheckoutStep step1='true' step2='true' step3='true' step4='true'/>
      <Container className='mt-5'>
        <Row>
          <Col lg={8}>
            <h3>Preview Order</h3>
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
          </Col>
          <Col lg={4}>
            <h3>Second</h3>
          </Col>
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