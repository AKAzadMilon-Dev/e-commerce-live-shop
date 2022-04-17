import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import {Alert, Container,Card,Button, Row, Col, ListGroup} from 'react-bootstrap';

function reducer(state,action){
    switch(action.type){
        case 'FATCH_REQUEST':
            return {...state,loading:true,error:''}
        case 'FATCH_SUCCESS':
            return {...state,loading:false,order:action.payload,error:''}
        case 'FATCH_FAIL':
            return {...state,loading:false,error:action.payload}
    }
}

const OrderPage = () => {
    const [{loading,error, order},dispatch] = useReducer(reducer,{
        loading:false,
        order:true,
        error:''
    })

    const {state3} = useContext(Store)
    const {userInfo} = state3

    const params = useParams()
    const {id: orderID} = params
    const navigate = useNavigate()

    useEffect(()=>{
        if(!order._id || (order._id && order._id !==orderID)){
            const fatchOrder = async ()=>{
                try{
                    dispatch({type: 'FATCH_REQUEST'})
                    const {data} = await axios.get(`/api/orders/${orderID}`,{
                        headers: {authorization: `Bearer ${userInfo.token}`}
                    })
                    dispatch({type: 'FATCH_SUCCESS',payload:data})
                }catch(error){
                    dispatch({type: 'FATCH_FAIL',payload:error})
                }
            }
            fatchOrder()
        }
    },[order,userInfo,orderID,navigate])

  return (
    loading
    ?
    <h2>Loading.....</h2>
    :
    error
    ?
    <Alert variant="danger">
        <p>{error}</p>
    </Alert>
    :
    <Container>
        <h1>order {orderID}</h1>
        <Row>
            <Col lg={8}>
                <Card >
                    <Card.Body>
                        <Card.Title>Shipping</Card.Title>
                        <Card.Text>
                            <b>Name:</b> {order.shippingInfo && order.shippingInfo.fullname}<br/>
                            <b>Address:</b> {order.shippingInfo && order.shippingInfo.address},{order.shippingInfo && order.shippingInfo.city},{order.shippingInfo && order.shippingInfo.country}<br/>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card >
                    <Card.Body>
                        <Card.Title>Payment</Card.Title>
                        <Card.Text>
                            <b>Method:</b> {order.paymentMethod}<br/>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card >
                    <Card.Body>
                        <Card.Title>Items</Card.Title>
                        <Card.Text>
                            <ListGroup>
                                {order.orderItems && order.orderItems.map(item=>(
                                    <ListGroup.Item>
                                        <Row>
                                            <Col lg={6}>
                                                <img style={{width:"50px"}} src={item.img}/>
                                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                            </Col>
                                            <Col lg={3}>{item.quantity}</Col>
                                            <Col lg={3}>{item.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={4}>
                <h3>Order Summary</h3>
                <Row>
                    <Col>Items</Col>
                    <Col>${order.totalPrice}</Col>
                </Row>
                <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                </Row>
            </Col>
        </Row>
    </Container>
  )
}

export default OrderPage