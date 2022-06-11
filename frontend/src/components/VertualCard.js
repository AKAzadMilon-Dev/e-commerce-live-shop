import React, { useContext, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from 'axios';
import {Store} from '../Store'

const VirtualCard = () => {

  const {state3} = useContext(Store)
  console.log(state3)

  const [amount, setAmount] = useState('')

  const handlePayment = async ()=>{
    const {data} = await axios.post('/api/userSignin/virtualcard',{
      amount: amount,
      owner: state3.userInfo._id
    })
  }
  return (
    <Container>
        <Form >
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Diposit Amount</Form.Label>
                <Form.Control onChange={(e)=>setAmount(e.target.value)} type="number" placeholder="Enter Your Amount" />
            </Form.Group>
        <Button onClick={handlePayment} variant="success">Virtual Card</Button>
        </Form>
    </Container>
  )
}

export default VirtualCard