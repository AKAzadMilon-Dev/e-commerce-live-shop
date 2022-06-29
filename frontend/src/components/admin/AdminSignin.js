import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const AdminSignin = () => {
    const navigate = useNavigate()

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    let handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            let {data} = await axios.post("/api/userSignin/adminsignin",{
                email,
                password
            })
            console.log(data)
            navigate( "/admin")
        }catch(error){
            console.log(error)
        }
    }

  return (
    <Container className='containerStyle mt-5 p-5'>
        <Helmet>
            <title>Signin Page</title>
        </Helmet>
        
        <Form className='formStyle border' onSubmit={handleSubmit}>
            <div className='signinHeader'>
                <h3>LIVE SHOP</h3>
            </div>
            <Alert className='mt-3 text-center' variant="success">
                <h3>Admin Sign In</h3>
            </Alert>
            <fieldset >
                <Form.Group className="mb-3">
                <Form.Label >Your E-mail</Form.Label>
                <Form.Control onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="E-mail" />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label >Your Password</Form.Label>
                <Form.Control onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>
            </fieldset>
                <Button onClick={handleSubmit} className='w-100' type="submit">Sign In</Button>
        </Form>
    </Container>
  )
}

export default AdminSignin