import React from 'react'
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'

const Signin = () => {
    const {search} = useLocation()
    const redirectUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectUrl ? redirectUrl : "/"
    console.log(redirectUrl)
  return (
    <>
        <Container className='containerStyle mt-5 p-5'>
            <Helmet>
                <title>Signin Page</title>
            </Helmet>
            
            <Form className='formStyle border'>
                <div className='signinHeader'>
                    <h3>LIVE SHOP</h3>
                    <h5>Sign In</h5>
                </div>
                <Alert className='mt-3 text-center' variant="danger">
                    
                </Alert>
                <fieldset >
                    <Form.Group className="mb-3">
                    <Form.Label >Your E-mail</Form.Label>
                    <Form.Control type="email" placeholder="E-mail" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label >Your Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </fieldset>
                    <Button className='w-100' type="info">Sign In</Button>
                    <Alert className='mt-3 text-center' variant="success">
                        Don't have an account <Link to={`/signup?redirect= ${redirect}`}>Create Registration</Link>
                    </Alert>
            </Form>
        </Container>
    </>
  )
}

export default Signin