import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Table } from 'react-bootstrap';
import { Store } from '../Store';
import axios from 'axios';


const reducer = (state, action)=>{
    switch(action.type){
        case "FETCH_REQUEST":
            return {...state, loading:true}
        case "FETCH_SUCCESS":
            return {...state, loading:false, orders: action.payload}
        case "FETCH_FAIL":
            return {...state, loading:false, error: action.payload}
        default:
            return state
    }
}

const MyOrder = () => {

    const {state3} = useContext(Store)

    const {userInfo} = state3

    const [{loading, error, orders}, dispatch] = useReducer(reducer,{
        loading: false,
        error: "",
        orders: []
    })

    useEffect(()=>{
        const fetchData = async ()=>{
            dispatch({type:"FETCH_REQUEST"})
            try{
                const {data} = await axios.get(`/api/orders/wish/${userInfo._id}`,{
                    headers: {authorization:`Bearer ${userInfo.token}`}
                })
                console.log(data)
                dispatch({type:"FETCH_SUCCESS", payload:data})
            }catch(error){
                dispatch({type:"FETCH_FAIL", payload:error.message})
            }
        }
        fetchData()
    },[userInfo])

  return (
    <div>
        <Helmet>
            <title>My Order List</title>
        </Helmet>
        {
            loading?
            <h2>Loading....</h2>
            :
            error?
            <h2>{error}</h2>
            :
            <Container>
                <h1 style={{textAlign:"center"}}>Order History</h1>
                <Table striped bordered hover variant="success">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product</th>
                            <th>Payment Method</th>
                            <th>TOTAL Price</th>
                            <th>PAID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item,index)=>(
                            <tr>
                                <td>{index+1}</td>
                                <td>{item.orderItems.map(item=>(<span>{item.name}, </span>))}</td>
                                <td>{item.paymentMethod}</td>
                                <td>{item.totalPrice}</td>
                                <td>{item.isPaid? "Paid": "Unpaid"}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        }
    </div>
  )
}

export default MyOrder