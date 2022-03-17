
import React, {useState, useEffect, useReducer, useContext} from 'react';
import axios from 'axios';
import { Col, Container, Row, Card, ListGroup, Badge, Button, Alert, Form } from 'react-bootstrap'
import Rating from './Rating';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import { Helmet } from 'react-helmet-async';
import {Store} from '../Store'
import { useParams, useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


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

  // React-Slick-Slider
  var settings = {
    dots: false,
    arrows:true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <FaArrowLeft/>,
    nextArrow: <FaArrowRight/>
  };
  // React-Slick-Slider

  let navigate = useNavigate();
  let params = useParams();
  let [relatedProduct, setRelatedProduct] = useState([])
  let [cuponText, setCupontext] = useState("")
  let [errorCupon, setErrorCupon] = useState("")
  let [afterDiscountPrice, setAfterDiscountPrice] = useState("")

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
        dispatch({
            type:'FETCH_SUCCESS',
            payload:product.data
        })
        const relatedProduct = await axios.get("/products")
        const filterItem = relatedProduct.data.filter((item)=>item.category == product.data.category && item.name !== product.data.name)
        setRelatedProduct(filterItem)
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
    payload: {
      ...product,
      price:afterDiscountPrice?afterDiscountPrice:product.price,
      quantity
    }
  })
  navigate(`/cartpage`);
}
  // Cupon and Discount Start
  const handleCuponChange = (e)=>{
    setCupontext(e.target.value)
  }

  const handleCupon = ()=>{
    if(product.cupon !== ""){
      if(product.cupon == cuponText){
        const discountPrice = (product.price * product.discount)/100
        const afterDiscountPrice = product.price - discountPrice
        if(afterDiscountPrice < product.discountLimit){
          setErrorCupon("For this discount price is not acceptable")
        }else{
          setAfterDiscountPrice(afterDiscountPrice)
        }
      }else{
        setErrorCupon("Wrong Cupon Code")
      }
    }else{
      setErrorCupon("There is no capon for the product.")
    }
    
  }
  // Cupon and Discount End

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
              <InnerImageZoom width={"550px"} src={product.img} zoomSrc={product.img} zoomScale={4.5} />
              }
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
                  <h5>${afterDiscountPrice?<del>{product.price}</del>: product.price }</h5>
                  {afterDiscountPrice?<h5>After Discount: ${afterDiscountPrice}</h5>:""}
                  
                  <div className="d-grid gap-2">
                    <Form.Control onChange={handleCuponChange} type="text" placeholder="Add Your Cupon" />
                    <Form.Text type="text">{errorCupon}</Form.Text>
                    <Button onClick={handleCupon} variant="info" size="md">Apply</Button>{' '}
                    <Button onClick={handleAddToCart} variant="primary" size="md">Add to card</Button>
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
        <Row>
          <h2 className='mt-5'>Related Product</h2>
          {relatedProduct.length > 0
          ?
          <Slider {...settings}>
            {
              relatedProduct.map(item=>(
                <Card  style={{ width: '18rem', padding:'0 15px' }}>
                  <Card.Img style={{ height: '200px' }} variant="top" src={item.img} />
                  <Card.Body>
                  <Link to={`/products/${item.slug}`}><Card.Title>{item.name}</Card.Title></Link>
                    <Card.Text><h5>${item.price}</h5></Card.Text>
                    <Button variant="primary">Add to cart</Button>
                  </Card.Body>
                </Card>
              ))
            }
          </Slider>
          :
          <Alert variant="danger">
            No Related Product Found!
          </Alert>
          }
        </Row>
      </Container>
    </>
  )
}

export default ProductDetails
