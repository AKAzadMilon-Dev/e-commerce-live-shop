import React, { useState, useEffect, useReducer, useContext} from 'react'
import { Col, Container, Dropdown, Row, Card, Button } from 'react-bootstrap'
import axios from 'axios';
import {Store} from '../Store'

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

const Compare = () => {
    const [singleProduct, setSingleProduct] = useState("")
    const [singleProduct2, setSingleProduct2] = useState("")

    const [{loading, product, error}, dispatch] = useReducer(reducer,{
        loading:false,
        product:[],
        error:""
    });

    useEffect( async ()=>{
        dispatch({
            type:'FECTH_REQUEST'
        })
        try{
            const product = await axios.get("/products")
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
    },[])

    const handleCompare = async (params)=>{
        const product = await axios.get(`/products/${params}`)
        setSingleProduct(product.data)
    }

    const handleCompare2 = async (params)=>{
        const product = await axios.get(`/products/${params}`)
        setSingleProduct2(product.data)
    }

    // Add to cart Start
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
    // navigate(`/cartpage`);
    }
    // Add to cart End


return (
    <>
        <Container>
            <Row className='mt-3'>
                <Col lg={6}>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">Compare Product</Dropdown.Toggle>

                        <Dropdown.Menu>
                            {product.map(item=>(
                                <>
                                    <Dropdown.Item onClick={()=>handleCompare(item.slug)} >
                                        {item.name}
                                        <img width="50" src={item.img}></img>
                                        $ {item.price}
                                    </Dropdown.Item>
                                </>
                            ))}
                        </Dropdown.Menu>
                        {singleProduct?
                            <Card className='mt-3 cartCompare'>
                                <Card.Img  variant="top" src={singleProduct.img} />
                                <Card.Body>
                                    <Card.Title><h4>{singleProduct.name}</h4></Card.Title>
                                    <Card.Text><h5>$ {singleProduct.price}</h5></Card.Text>
                                    <Card.Text><h6>{singleProduct.description}</h6></Card.Text>
                                    <Button variant="primary">Add to cart</Button>
                                </Card.Body>
                            </Card>
                            :
                            <h3>Choose a product</h3>
                        }
                    </Dropdown>
                </Col>

                <Col lg={6}>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">Compare Product</Dropdown.Toggle>

                        <Dropdown.Menu>
                            {product.map(item=>(
                                <>
                                    <Dropdown.Item onClick={()=>handleCompare2(item.slug)}>
                                        {item.name}
                                        <img width="50" src={item.img}></img>
                                        $ {item.price}
                                    </Dropdown.Item>
                                </>
                            ))}
                        </Dropdown.Menu>
                            {singleProduct2?
                            <Card className='mt-3 cartCompare'>
                                <Card.Img variant="top" src={singleProduct2.img} />
                                <Card.Body>
                                    <Card.Title><h4>{singleProduct2.name}</h4></Card.Title>
                                    <Card.Text><h5>$ {singleProduct2.price}</h5></Card.Text>
                                    <Card.Text><h6>{singleProduct2.description}</h6></Card.Text>
                                    <Button onClick={handleAddToCart} variant="primary">Add to cart</Button>
                                </Card.Body>
                            </Card>
                            :
                            <h3>choose a product</h3>
                        }
                            
                    </Dropdown>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Compare