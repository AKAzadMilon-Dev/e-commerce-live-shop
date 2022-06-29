import axios from 'axios';
import React,{ useEffect, useState } from 'react';
import { Col, Row, Table, Button } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

const AdminUserList = () => {

    let [userlist, setUserlist] = useState([])

    useEffect (()=>{
        async function userlist(){
            let {data} = await axios.get('/api/userSignin/userlist')
            console.log(data)
            setUserlist(data)
        }
        userlist()
    },[])

  return (
    <Row>
        <Col lg={3}>
            <AdminNavbar active='userlist' />
        </Col>
        <Col lg={9}>
            <h3 className='welcome'>Users Table</h3>
            <Table striped bordered >
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userlist.map((item, index)=>(
                        <tr>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.isVendor?'vendor':item.isAffiliate?'Affiliate':''}</td>
                            <td>
                                <Button variant="danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    </Row>
  )
}

export default AdminUserList