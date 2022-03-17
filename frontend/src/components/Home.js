import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet-async';
import { Container, Button, Modal,ListGroup, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
// import Products from './Products';

const Home = () => {

  const [show, setShow] = useState(false);
  const [discountImg, setDiscountImg] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryProduct, setCategoryProduct] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const categoryArr = []
  useEffect( async ()=>{
    // const {data} = await axios.get(`/discount`)
    // setDiscountImg(data.img)
    // setShow(true)
    const product = await axios.get("/products")
    
    product.data.map((item)=>{
      if(categoryArr.indexOf(item.category) == -1){
        categoryArr.push(item.category)
      }
    })
    setCategory(categoryArr)

  },[])

  const handleCategory = async (category)=>{
    const categoryProduct = await axios.get(`/category/${category}`)
    setCategoryProduct(categoryProduct.data)
  }

  return (
    <>
      <Helmet>
          <title>Home Page</title>
      </Helmet>
      <div className='banner'>
        <img className='banner-img' style={{width: "100%", height:"500px"}} src='/images/banner.jpg' alt=''/>
        <Container>
          <div className='listCategoryContainer'>
            <div className='listCategory'>
              <ListGroup>
                {category.map(item=>(
                  <ListGroup.Item onClick={()=>handleCategory(item)}>{item}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
        </Container>
      </div>

      

      <Container>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className='discountimg' src={discountImg}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      
      {/* Category Product Show Here */}
      <div className='categoryShow'>
        <Container>
          <Row>
            {categoryProduct.map(item=>(
              <Col lg={3}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={item.img}/>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>$ {item.price}</Card.Text>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      {/* Category Product show End */}

        {/* <Products></Products> */}
    </>
  )
}

export default Home
