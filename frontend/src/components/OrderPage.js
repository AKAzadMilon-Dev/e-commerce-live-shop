import axios from 'axios';
import { PayPalButtons,usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import {Alert, Container,Card, Row, Col, ListGroup} from 'react-bootstrap';
import { toast } from 'react-toastify';

function reducer(state,action){
    switch(action.type){
        case 'FATCH_REQUEST':
            return {...state,loading:true,error:''}
        case 'FATCH_SUCCESS':
            return {...state,loading:false,order:action.payload,error:''}
        case 'FATCH_FAIL':
            return {...state,loading:false,error:action.payload}
        case 'PAY_REQUEST':
            return {...state,loadingPay:true}
        case 'PAY_SUCCESS':
            return {...state,loadingPay:false,successPay:true}
        case 'PAY_FAIL':
            return {...state,loadingPay:false,errorPay:action.payload}
        case 'PAY_RESET':
            return {...state,loadingPay:false,successPay:false}
        default:
            return state
    }
}

const OrderPage = () => {
    const [{loading,error, order, successPay, loadingPay},dispatch] = useReducer(reducer,{
        loading:false,
        order:true,
        error:'',
        successPay:false,
        loadingPay:false
    })

    const {state3} = useContext(Store)
    const {userInfo} = state3

    const params = useParams()
    const {id: orderID} = params
    const navigate = useNavigate()

    const [{isPending}, paypalDispatch] = usePayPalScriptReducer()

    function createOrder(data,actions){
        return actions.order
        .create({
            purchase_units:[
                {
                    amount: {value: order.totalPrice}
                }
            ]
        }).then((orderID)=>{
            return orderID
        })
    }

    function onApprove(data,actions){
        return actions.order.capture().then(async function(details){
            try{
                dispatch({type: 'PAY_REQUEST'})
                const {data} = await axios.put(`/api/orders/${order._id}/pay`,details,{
                    headers: {authorization: `Bearer ${userInfo.token}`}
                })
                dispatch({type: 'PAY_SUCCESS',payload: data})
                toast.success("Order Is Paid")

            }catch(error){
                dispatch({type: 'PAY_FAIL', payload: error.message})
                toast.error(error.message)
            }
        })
    }

    function onError(error){
        toast.error(error)
    }

    useEffect(()=>{
        if(!order._id || successPay || (order._id && order._id !==orderID)){
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
            if(successPay){
                dispatch({type:'PAY_RESET'})
            }

        }else{
            const loadPaypalScript = async ()=>{
                const {data: clientID} = await axios.get('/api/keys/paypal',{
                    headers: {authorization:`Bearer ${userInfo.token}`}
                })
                paypalDispatch({
                    type: 'resetOptions',
                    value:{
                        'client-id': clientID,
                        currency:'USD'
                    }
                })
                paypalDispatch({
                    type:'setLoadingStatus',
                    value:'pending'
                })
            }
            loadPaypalScript()
        }
    },[order,userInfo,orderID,navigate,paypalDispatch,successPay])

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
                                                <img style={{width:"50px"}} src={item.img} alt=""/>
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
                    <Col>Items Price</Col>
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
                {/* paypal Button */}
                <Row>
                    {!order.isPaid
                    &&
                        isPending
                            ?
                                <h3>Loading.......</h3>
                            :
                            <Col>
                                {order.paymentMethod == "Paypal" && 
                                    <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                                }
                            </Col>
                    }
                    {loadingPay && <h3>Payment Loading</h3>}
                </Row>
            </Col>
        </Row>
    </Container>
  )
}

export default OrderPage