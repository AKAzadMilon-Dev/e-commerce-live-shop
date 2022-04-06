import React, {useContext, useEffect, useState} from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Store} from '../../Store';
import { toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate()
    const {search} = useLocation()
    const redirectUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectUrl ? redirectUrl : "/"

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conPassword, setConPassword] = useState("")

    const {state3, dispatch3} = useContext(Store)

    const {userInfo} = state3

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const {data} = await axios.post("/api/userSignin/signup",{
                name,
                email,
                password
            })
            console.log(data)
            navigate("/signin",{state:"Please Sign in for continue"})
        }catch(error){
            toast.error("Invalid Email or Password",{
                position: "bottom-center",
                autoClose: 3000
            })
        }
    }

    useEffect(()=>{
        if(userInfo){
            navigate(redirect || '/')
        }
    },[])

  return (
    <>
        <Container className='containerStyle mt-5 p-5'>
            <Helmet>
                <title>Signup Page</title>
            </Helmet>
            
            <Form className='formStyle border' onSubmit={handleSubmit}>
                <div className='signinHeader'>
                    <h3>LIVE SHOP</h3>
                </div>
                <Alert className='mt-3 text-center' variant="success">
                    <h3>Sign Up</h3>
                </Alert>
                <fieldset >
                    <Form.Group className="mb-3">
                        <Form.Label >Your Name</Form.Label>
                        <Form.Control onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label >Your E-mail</Form.Label>
                        <Form.Control onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="E-mail" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label >Password</Form.Label>
                        <Form.Control onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label >Confirm Password</Form.Label>
                        <Form.Control onChange={(e)=>setConPassword(e.target.value)} type="password" placeholder="Confirm Password" />
                    </Form.Group>
                </fieldset>
                    <Button onClick={handleSubmit} className='w-100' type="submit">Sign Up</Button>
            </Form>
                    <Alert className='mt-3 text-center' variant="success">
                        Already have an account <Link to={`/signin?redirect= ${redirect}`}>Sign In</Link>
                    </Alert>
        </Container>
    </>
  )
}

export default Signup