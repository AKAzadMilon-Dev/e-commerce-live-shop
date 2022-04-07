import React, { useState } from 'react'
import { Col, Container, Form, Row, Alert, Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import CheckoutStep from './CheckoutStep'

const Payment = () => {
    let [paymentMethhod, setPaymentMethod] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault()
    }
  return (
    <>
        <Helmet>
            <title>Payment</title>
        </Helmet>
        <CheckoutStep step1='true' step2='true' step3='true'/>
        <Container className='w-25 border mt-5 p-3'>
            <Row>
                <Col>
                    <Alert className='text-center' variant="success">
                        <h4>Payment Method System</h4> 
                    </Alert>
                    <Form onSubmit={handleSubmit}>  
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
                            <Button type='submit' variant="primary" size="md">
                                Continue
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Payment
