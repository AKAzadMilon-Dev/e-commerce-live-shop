import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Nav, Form, Button } from 'react-bootstrap';
import {Store} from '../Store';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from 'react-draft-wysiwyg';
import EditorConvertToHTML from './Editor'

const Dashboard = () => {

  const {state3} = useContext(Store)

  const [product, setProduct] = useState(false)
  const [storeName, setStoreName] = useState(false)
  const [storename, setStorename] = useState('')
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [inStock, setInStock] = useState('')
  const [cupon, setCupon] = useState('')
  const [discount, setDiscount] = useState('')
  const [discountLimit, setDiscountLimit] = useState('')
  const [img, setImg] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const {data} = await axios.post('/products/storename',{
      id: state3.userInfo._id,
      name: name
    })
  }

  const handleStorename = ()=>{
    setStoreName(true)
    setProduct(false)
  }

  const handleProduct = ()=>{
    setStoreName(false)
    setProduct(true)
  }

  const handleProductSubmit = async (e)=>{
    e.preventDefault()
    setText(localStorage.getItem('text'))
    const {proData} = await axios.post('/products',{
      name: name,
      slug: slug,
      category: category,
      price: price,
      inStock: inStock,
      cupon: cupon,
      discount: discount,
      discountLimit: discountLimit,
      img: img,
      description: localStorage.getItem('text'),
      owner: state3.userInfo._id
    })

  }
  
  useEffect(()=>{
    async function StoreName(){
      const {data} = await axios.get(`/products/storename/${state3.userInfo._id}`)
      setStorename(data[0].name)
    }
    StoreName()
  },[])

  const onEditorStateChange = ()=>{

  }

  return (
    <div>
      <Row>
        <Col lg={2}>
          <Nav className="flex-column">
            <Nav.Link onClick={handleProduct}>Create Product</Nav.Link>
            <Nav.Link onClick={handleStorename}>Create Store Name</Nav.Link>
            <Nav.Link>Payment</Nav.Link>
          </Nav>
        </Col>
        <Col lg={10}>
          {storeName &&
            <Form className='mt-3' onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group >
                  <Form.Label>Store Name</Form.Label>
                  <Form.Control onChange={(e)=> setName(e.target.value)} type="text" placeholder="Enter Store Name" />
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit">Submit</Button>{' '}
              <Button variant="primary" type="submit">Edit</Button>
            </Form>
          }

          {product &&
            <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" name="name"/>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Slug</Form.Label>
                <Form.Control onChange={(e)=>setSlug(e.target.value)} type="text" placeholder="Slug" name="slug"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Category</Form.Label>
                <Form.Control onChange={(e)=>setCategory(e.target.value)} type="text" placeholder="Category" name="category"/>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Price</Form.Label>
                <Form.Control onChange={(e)=>setPrice(e.target.value)} type="number" placeholder="Price" name="price"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label> Stock</Form.Label>
                <Form.Control onChange={(e)=>setInStock(e.target.value)} type="number" placeholder="Stock" name="stock"/>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label> Cupon</Form.Label>
                <Form.Control onChange={(e)=>setCupon(e.target.value)} type="number" placeholder="Cupon" name="cupon"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label> Discount</Form.Label>
                <Form.Control onChange={(e)=>setDiscount(e.target.value)} type="text" placeholder="Discount" name="discount"/>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Discount Limit</Form.Label>
                <Form.Control onChange={(e)=>setDiscountLimit(e.target.value)} type="number" placeholder="Discount Limit" name="discountlimit"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Image</Form.Label>
                <Form.Control onChange={(e)=>setImg(e.target.value)} type="text" required name="text"/>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Store Name</Form.Label>
                <Form.Control type="text" placeholder="Store Name" disabled value={storename}/>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <EditorConvertToHTML onChange={(e)=>setDescription(localStorage.getItem('text'))} placeholder='Description'/>
            </Form.Group>
            <Button type="submit" onClick={handleProductSubmit}>Submit form</Button>
          </Form>
          }
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard