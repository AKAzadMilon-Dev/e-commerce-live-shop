import React, {useContext, useEffect, useState} from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Store} from '../../Store';
import { toast } from 'react-toastify';

const Signin = () => {
    const navigate = useNavigate()
    const {search,state} = useLocation()
    // if(state){
    //     toast.success(state,{
    //         position: "bottom-center",
    //         autoClose: 4000
    //     })
    // }
    const redirectUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectUrl ? redirectUrl : "/"

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {state3, dispatch3} = useContext(Store)

    const {userInfo} = state3

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const {data} = await axios.post("/api/userSignin/signin",{
                email,
                password
            })

            dispatch3({type:"USER_SIGNIN", payload:data})
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || "/")
        }catch(error){
            toast.error("Invalid Email or Password",{
                position: "bottom-center",
                autoClose: 4000
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
                <title>Signin Page</title>
            </Helmet>
            
            <Form className='formStyle border' onSubmit={handleSubmit}>
                <div className='signinHeader'>
                    <h3>LIVE SHOP</h3>
                </div>
                <Alert className='mt-3 text-center' variant="success">
                    <h3>Sign In</h3>
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
                    <Alert className='mt-3 text-center' variant="success">
                        Don't have an account <Link to={`/signup?redirect= ${redirect}`}>Create Registration</Link>
                    </Alert>
        </Container>
    </>
  )
}

export default Signin