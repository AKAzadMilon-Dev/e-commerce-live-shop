import React,{useContext} from 'react'
import { Col, Container, Row, Alert, ListGroup, Button, Table } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link,useNavigate } from 'react-router-dom'
import { Store } from '../Store'

const Wishlist = () => {
    const navigate = useNavigate();
    const {state2, dispatch2} = useContext(Store)
    const {wishList:{wishListItems}} = state2
    
    const updateCart = (item)=>{
        dispatch2({
            type: 'WISHLIST_ADD_ITEM',
            payload: {...item}
        })
    }

    const handleRemove = (item)=>{
        dispatch2({
            type: 'WISHLIST_REMOVE_ITEM',
            payload: item
        })
    }


  return (
    <>
        <Container>
            <Helmet>
                <title>Wishlist Page</title>
            </Helmet>
            <Row className='mt-5'>
                <Col lg={12}>
                    {wishListItems.length < 0 
                    ?
                    <Alert className='text-center' variant="danger">
                        This Wishlist is Empty
                    </Alert>
                    :
                    <ListGroup>
                        <h2>Wishlist Page</h2>
                        <Row>
                            <Col>
                                <Table className='cartTd' striped bordered hover variant="primary">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Product Name</th>
                                            <th>Image</th>
                                            <th>Unit Price</th>
                                            <th>Stock Status</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    {wishListItems.map((item)=>(
                                        <tbody >
                                            <tr>
                                                <td>1</td>
                                                <td><Link to={`/products/${item.slug}`}>{item.name}</Link></td>
                                                <td>
                                                    <img width="50" src={item.img}></img>
                                                </td>
                                                <td>$ {item.price}</td>
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
            </Row>
        </Container>
    </>
  )
}

export default Wishlist