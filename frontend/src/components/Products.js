import React, {useState, useEffect, useReducer} from 'react';
import { Link } from 'react-router-dom';
import { SpinnerDotted } from 'spinners-react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Rating from './Rating';


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

  return (
    <>
        <Container>
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
                                    <Link to={`/products/${item.slug}`}>{item.name}</Link>
                                </Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                <Rating rating={item.rating}/>
                                <Card.Text>$ {item.price}</Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Button variant="primary">Add to card</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </>
  )
}

export default Products
