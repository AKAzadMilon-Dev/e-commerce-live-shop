import React, {useState, useEffect, useReducer, useContext} from 'react';
import { Link } from 'react-router-dom';
import { SpinnerDotted } from 'spinners-react';
import axios from 'axios';
import { Container, Row, Col, Card, Button,Modal,Badge,Form } from 'react-bootstrap';
import Rating from './Rating';
import { Helmet } from 'react-helmet-async';
import {Store} from '../Store'
import { HiShoppingCart } from "react-icons/hi";
import { FaVimeo, FaTrashAlt, FaHeart } from "react-icons/fa";


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


const Products = () => {
    const [lgShow, setLgShow] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchMatch, setSearchMatch] = useState("");

    const [{loading, product, error}, dispatch] = useReducer(reducer,{
        loading:false,
        product:[],
        error:""
    });

    const [details, setDetails] = useState({})

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

    // Modals Product Details show
    const handleDetails= async (proDetails)=>{
        setLgShow(true)
        const productDetails = await axios.get(`/products/${proDetails}`)
        setDetails(productDetails.data)
    }

    const {state, dispatch: contextDispatch, dispatch2, state3} = useContext(Store)

    const {cart, wishList} = state

    const handleAddToCart = async (product)=>{
        const exitingItem = cart.cartItems.find((item)=> item._id === product._id)
        const quantity = exitingItem ? exitingItem.quantity + 1 : 1
        const {data} = await axios.get(`/cartProduct/ ${product._id}`)

        if(data.inStock < quantity){
            window.alert(`${product.name} out of stock`)
            return
        }

        contextDispatch({
            type:'ADD_CART_ITEM',
            payload: {...product, quantity: 1}
        })
    }

    // WishList part start
    const handleAddToWishList = async (product)=>{
        
        dispatch2({
            type:'WISHLIST_ADD_ITEM',
            payload: {...product}
        })
    }

    // Wishlist part End

    const {cart:{cartItems}} = state
    
    const updateCart = (item, quantity)=>{
        console.log(quantity)
        contextDispatch({
            type: 'ADD_CART_ITEM',
            payload: {...item, quantity}
        })
    }

    const handleRemove = (item)=>{
        contextDispatch({
            type: 'CART_REMOVE_ITEM',
            payload: item
        })
    }

    const handleSearch = (e)=>{
        setSearchKeyword(e.target.value)
        
    }


    return (
        <>
            <Container>
            <Helmet>
                <title>Product Page</title>
            </Helmet>
            <Form.Control onChange={handleSearch} type="type" placeholder="Search..." />
                <Row>
                    { loading?
                    <div className='loading'>
                        <SpinnerDotted size={50} thickness={150} speed={130} color="rgba(57, 172, 77, 1)" />
                    </div>
                    :
                    product.map(item=>(
                        <Col lg={3} style={{marginTop: "15px"}}>
                            <Card>
                                <Card.Img variant="top" src={item.img} />
                                <Card.Body>
                                    <Card.Title>
                                        {state3.userInfo
                                        ?
                                        <Link to={ state3.userInfo.isAffiliate?`/products/${item.slug}?id:${state3.userInfo._id}`:`/products/${item.slug}`}>{item.name} {item.totalSale > 50 ?<Badge bg="warning">Best Sale</Badge>:""}</Link>
                                        :
                                        <Link to={`/products/${item.slug}`}>{item.name} {item.totalSale > 50 ?<Badge bg="warning">Best Sale</Badge>:""}</Link>
                                        }
                                    </Card.Title>
                                    <Card.Text>
                                        <h5>$ {item.price}</h5>
                                    </Card.Text>
                                    <Rating rating={item.rating} ratingNumber={item.ratingNumber}/>
                                    <Card.Text dangerouslySetInnerHTML={{__html: item.description}}></Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    {cartItems.map(items=>(
                                        item._id == items._id ?
                                        <>
                                            <Button onClick={()=>updateCart(items, items.quantity+1)} disabled={items.quantity == items.inStock} variant="success">+</Button>
                                                <span>{items.quantity}</span>
                                            <Button onClick={()=>updateCart(items, items.quantity-1)} disabled={items.quantity === 1} variant="success">-</Button>
                                            <FaTrashAlt className=' removeIcon' onClick={()=>handleRemove(item)}/>
                                        </>
                                        :
                                        ""
                                    ))}
                                    <br/>
                                        {item.inStock == 0 
                                            ?
                                            <div>
                                                <Button variant="danger">Out of Stock</Button>
                                                <FaVimeo className='mt-3 viewDetails' onClick={()=>{handleDetails(item.slug)}}>Details</FaVimeo>
                                                <FaHeart className='mt-3 wishIcon' onClick={()=>handleAddToWishList(item)}></FaHeart>
                                            </div>
                                            :
                                            <div>
                                                <HiShoppingCart className='mt-3 ms-3 me-3 shopingCart' onClick={()=>handleAddToCart(item)}/>
                                                <FaVimeo className='mt-3 viewDetails' onClick={()=>{handleDetails(item.slug)}}>Details</FaVimeo>
                                                <FaHeart className='mt-3 wishIconDetails' onClick={()=>handleAddToWishList(item)}>Wishlist</FaHeart>
                                            </div>
                                        }
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                
                {/* Modals */}
                <Modal
                    className='modalBody'
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                    <Modal.Title className='text-center'>
                        Product Details
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        {details?
                        <Card>
                            <Card.Body>
                                
                                {details.inStock == 0
                                ?
                                <Button variant="danger">Out of Stock</Button>
                                :
                                <>
                                    <Card.Img src={details.img} />
                                    <Card.Title>
                                        {details.name}
                                    </Card.Title>
                                    <Card.Text>
                                        <h5>$ {details.price}</h5>
                                    </Card.Text>
                                    <Rating rating={details.rating} ratingNumber={details.ratingNumber}/>
                                    <Card.Text>{details.description}</Card.Text>
                                    <Button onClick={()=>handleAddToCart(details)} variant="primary">Add To Cart</Button>
                                </>
                                }
                            </Card.Body>
                        </Card>
                        :
                        <h3>Details Not Available</h3>
                        }
                        
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    )
}

export default Products
