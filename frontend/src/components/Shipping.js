import React, {useContext, useState, useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { Store } from '../Store';
import CheckoutStep from './CheckoutStep';

const Shipping = () => {

    const {state4, dispatch4, state3} = useContext(Store)
    const navigate = useNavigate()
    const {userInfo} = state3

    const [fullname, setFullname] = useState(state4.shippingInfo.fullname || "")
    const [address, setAddress] = useState(state4.shippingInfo.address || "")
    const [city, setCity] = useState(state4.shippingInfo.city || "")
    const [postcode, setPostcode] = useState(state4.shippingInfo.postcode || "")
    const [country, setCountry] = useState(state4.shippingInfo.country || "")


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

        navigate('/payment')
    }

    useEffect(()=>{
        if(!userInfo){
            navigate('/signin?redirect=/shipping')
        }
    },[])

  return (
    <>
        <Helmet>
            <title>Shipping</title>
        </Helmet>

        <CheckoutStep step1='true' step2='true'/>

        <Container className='containerStyle mt-3 p-3 border'>
            <Alert className='mt-3 text-center' variant="success">
                <h3>Shipping Address</h3>
            </Alert>
            <div>
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
                    </div>
                </Form>
            </div>
        </Container>
    </>
  )
}

export default Shipping