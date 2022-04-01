import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const CheckoutStep = (props) => {
  return (
    <>
        <Container className='step mt-3'>
            <Row>
                <Col>
                    <h3 className={props.step1? 'stepactive' : ""}>Signin</h3>
                </Col>
                <Col>
                    <h3 className={props.step2? 'stepactive' : ""}>Shipping Address</h3>
                </Col>
                <Col>
                    <h3 className={props.step3? 'stepactive' : ""}>Payment</h3>
                </Col>
                <Col>
                    <h3 className={props.step4? 'stepactive' : ""}>Placeholder</h3>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default CheckoutStep