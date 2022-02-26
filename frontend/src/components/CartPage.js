import React,{useContext} from 'react'
import { Col, Container, Row, Alert, ListGroup, Button, Table } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link,useNavigate } from 'react-router-dom'
import { Store } from '../Store'

const CartPage = () => {
    const navigate = useNavigate();
    const {state, dispatch} = useContext(Store)
    const {cart:{cartItems}} = state
    
    const updateCart = (item, quantity)=>{
        console.log(quantity)
        dispatch({
            type: 'ADD_CART_ITEM',
            payload: {...item, quantity}
        })
    }

    const handleRemove = (item)=>{
        dispatch({
            type: 'CART_REMOVE_ITEM',
            payload: item
        })
    }

    const handleCheckOut = ()=>{
        navigate('/signin?redirect=/shipping')
    }

  return (
    <>
        <Container>
            <Helmet>
                <title>Cart Page</title>
            </Helmet>
            <Row className='mt-5'>
                <Col lg={8}>
                    {cartItems.length < 0 
                    ?
                    <Alert className='text-center' variant="danger">
                        This Card is Empty
                    </Alert>
                    :
                    <ListGroup>
                        <h2>My Wishlist</h2>
                        <Row>
                            <Col>
                                <Table className='cartTd' striped bordered hover variant="primary">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product Name</th>
                                            <th>Image</th>
                                            <th>Unit Price</th>
                                            <th>Quantity</th>
                                            <th>Stock Status</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    {cartItems.map((item)=>(
                                        <tbody >
                                            <tr>
                                                <td>1</td>
                                                <td><Link to={`/products/${item.slug}`}>{item.name}</Link></td>
                                                <td>
                                                    <img width="50" src={item.img}></img>
                                                </td>
                                                <td>$ {item.price}</td>
                                                <td>
                                                    <Button onClick={()=>updateCart(item, item.quantity+1)} disabled={item.quantity == item.inStock} variant="success">+</Button>
                                                        <span>{item.quantity}</span>
                                                    <Button onClick={()=>updateCart(item, item.quantity-1)} disabled={item.quantity === 1} variant="success">-</Button>
                                                </td>
                                                <td>{item.inStock}</td>
                                                <td><Button onClick={()=>handleRemove(item)} variant="danger">Delete</Button></td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </Table>
                            </Col>
                        </Row>
                    </ListGroup>
                }
                </Col>
                <Col lg={4}>
                    <h1>Total ({cartItems.reduce((accumulator, current)=>accumulator + current.quantity, 0)}) products</h1>
                    <h3>Price: $ {cartItems.reduce((accumulator, current)=>accumulator + current.price * current.quantity, 0)}</h3>
                    <Button onClick={handleCheckOut} className='w-100' variant='primary'>Check Out</Button>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default CartPage