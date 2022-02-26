
import React, {useState, useEffect, useReducer, useContext} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Col, Container, Row, Card, ListGroup, Badge, Button, Alert } from 'react-bootstrap'
import Rating from './Rating';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import { Helmet } from 'react-helmet-async';
import {Store} from '../Store'
import { useNavigate } from "react-router-dom";


function reducer(state, action) {
  switch (action.type) {
    case 'FECTH_REQUEST':
      return {
          ...state,
          loading:true
      };
    case 'FETCH_SUCCESS':
      return {
          ...state,
          loading:false,
          product:action.payload
      };
    case 'FETCH_FAILS':
      return {
          ...state,
          loading:false,
          error:action.payload
      };
    default:
      return state
  }
}

const ProductDetails = () => {
  let navigate = useNavigate();
  let params = useParams();

    const [{loading, product, error}, dispatch] = useReducer(reducer,{
      loading:false,
      product:{},
      error:""
  });

  useEffect( async ()=>{
    dispatch({
        type:'FECTH_REQUEST'
    })
    try{
        const product = await axios.get(`/products/${params.slug}`)
        console.log(product)
        dispatch({
            type:'FETCH_SUCCESS',
            payload:product.data
        })
    }catch{
        dispatch({
            type:'FETCH_FAILS',
            payload:error.message
        })
    }
},[params.slug])

const {state, dispatch: contextDispatch} = useContext(Store)

const {cart} = state

const handleAddToCart = async ()=>{
  const exitingItem = cart.cartItems.find((item)=> item._id === product._id)
  const quantity = exitingItem ? exitingItem.quantity + 1 : 1
  const {data} = await axios.get(`/cartProduct/${product._id}`)

  if(data.inStock < quantity){
    window.alert(`${product.name} out of stock`)
    return
  }

  contextDispatch({
    type:'ADD_CART_ITEM',
    payload: {...product, quantity: 1}
  })
  navigate(`/cartpage`);
}

  return (
    <>
      <Container>
        <Helmet>
            <title>{product.name}</title>
        </Helmet>
        <Row>
          {product ?
          <>
            <Col lg={6}>
              {product.img &&
              <InnerImageZoom src={product.img} zoomSrc={product.img} />
              }
            {/* <img className='img' src={product.img} alt={product.name}></img> */}
          </Col>
          <Col lg={3}>
            <Card className='cartStyle'>
              <ListGroup.Item >
                <h4>{product.name}</h4>
                <h6>Total = {product.inStock > 0 ? <Badge bg="success">{product.inStock}</Badge> : <Badge bg="danger">{product.inStock}</Badge>} Stock </h6>
              </ListGroup.Item>
              <ListGroup variant="flush">
                <ListGroup.Item className='productDetails'>
                  <Rating rating={product.rating} ratingNumber={product.ratingNumber}/>
                  <h5>Price = $ {product.price}</h5>
                  <h6>{product.description}</h6>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col lg={3}>
            <Card className='cartStyle'>
              <ListGroup variant="flush">
                <ListGroup.Item className='productDetails'>
                  <h4>Price</h4>
                </ListGroup.Item>
                <ListGroup.Item className='productDetails'>
                  <h5>$ 120</h5>
                  <div className="d-grid gap-2">
                    <Button onClick={handleAddToCart} variant="primary" size="lg">Add to card</Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          </>
          :
          <Alert className='text-center mt-5' variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              Change this and that and try again.
            </p>
          </Alert>
        }
        </Row>
      </Container>
    </>
  )
}

export default ProductDetails
