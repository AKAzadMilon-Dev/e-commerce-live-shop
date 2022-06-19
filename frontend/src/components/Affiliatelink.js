import React, {useState, useEffect} from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

const Affiliatelink = () => {

    const [product, setProduct] = useState([])

    useEffect(()=>{
        async function pro(){
            const product = await axios.get("/products")
            setProduct(product.data)
        }
        pro()
    },[])
  return (
    <Container>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Serial No</th>
                <th> Name</th>
                <th> Price</th>
                <th>Username</th>
                </tr>
            </thead>
            <tbody>
                {product.map((item, index)=>(
                    <tr>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                        <td>Copy Link</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </Container>
  )
}

export default Affiliatelink