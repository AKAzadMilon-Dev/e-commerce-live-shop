import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Tabs, Tab, Form, Button, Table } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

const AdminRoleManagement = () => {

    let [name, setName] = useState('')
    let [productupload, setProductupload] = useState(false)
    let [productapprove, setProductapprove] = useState(false)
    let [categoryupload, setCategoryupload] = useState(false)
    let [brand, setBrand] = useState(false)
    let [blog, setBlog] = useState(false)
    let [roles, setRoles] = useState([])
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [adminrole, setAdminrole] = useState('')

    let rolelist = []

    let handleProductUpload = ()=> {
        if(rolelist.indexOf('productupload') !== -1){
            rolelist.splice(rolelist.indexOf('productupload'), 1)
            console.log(rolelist)
        }else{
            rolelist.push('productupload')
            console.log(rolelist)
        }
    }

    let handleProductApprove = ()=> {
        if(rolelist.indexOf('productapprove') !== -1){
            rolelist.splice(rolelist.indexOf('productapprove'), 1)
            console.log(rolelist)
        }else{
            rolelist.push('productapprove')
            console.log(rolelist)
        }
    }

    let handleCategoryUpload = ()=> {
        if(rolelist.indexOf('categoryupload') !== -1){
            rolelist.splice(rolelist.indexOf('categoryupload'), 1)
            console.log(rolelist)
        }else{
            rolelist.push('categoryupload')
            console.log(rolelist)
        }
    }

    let handleBrand = ()=> {
        if(rolelist.indexOf('brand') !== -1){
            rolelist.splice(rolelist.indexOf('brand'), 1)
            console.log(rolelist)
        }else{
            rolelist.push('brand')
            console.log(rolelist)
        }
    }

    let handleBlog = ()=> {
        if(rolelist.indexOf('blog') !== -1){
            rolelist.splice(rolelist.indexOf('blog'), 1)
            console.log(rolelist)
        }else{
            rolelist.push('blog')
            console.log(rolelist)
        }
    }

    let handleUserRole = async (e)=>{
        e.preventDefault();
        let {data} = await axios.post('/api/userSignin/userrole',{
            name: name,
            permissions: rolelist
        })
        console.log(data)
    }

    let handleAssignRole = async (e)=>{
        e.preventDefault();
        let {data} = await axios.post('/api/userSignin/adminrole',{
            email: email,
            password: password,
            adminrole: adminrole
        })
        console.log(data)
    }

    useEffect(()=>{
        async function role(){
            let {data} = await axios.get('/api/userSignin/userrole')
            setRoles(data)
        }
        role()
    },[])

    return (
        <Row>
            <Col lg={3}>
                <AdminNavbar active='rolemanagement' />
            </Col>
            <Col lg={9}>
                <h3 className='welcome'>Role Assign List</h3>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="rolelist" title="Role List">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="assignrole" title="Assign Role">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Select onChange={(e)=>setAdminrole(e.target.value)} aria-label="Default select example">
                                <option>Select Role</option>
                                {roles.map(item=>(
                                    <option value={item._id}>{item.name}</option>
                                ))}
                            </Form.Select>

                            <Button onClick={handleAssignRole} className='mt-3' variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Tab>
                    <Tab eventKey="createrole" title="Create Role">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Create Role</Form.Label>
                                <Form.Control onChange={(e)=>setName(e.target.value)} type="text" placeholder="Create Role" />
                            </Form.Group>
                            <div className="mb-3">
                                <Form.Check 
                                    type='switch'
                                    id={`default-chackbox`}
                                    label={`product upload`}
                                    onChange={handleProductUpload}
                                />
                                <Form.Check 
                                    type='switch'
                                    id={`default-chackbox`}
                                    label={`product approve`}
                                    onChange={handleProductApprove}
                                />
                                <Form.Check 
                                    type='switch'
                                    id={`default-chackbox`}
                                    label={`category upload`}
                                    onChange={handleCategoryUpload}
                                />
                                <Form.Check 
                                    type='switch'
                                    id={`default-chackbox`}
                                    label={`brand`}
                                    onChange={handleBrand}
                                />
                                <Form.Check 
                                    type='switch'
                                    id={`default-chackbox`}
                                    label={`blog`}
                                    onChange={handleBlog}
                                />
                            </div>
                            <Button onClick={handleUserRole} variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    )
}

export default AdminRoleManagement