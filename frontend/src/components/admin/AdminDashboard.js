import React from 'react'
import { Col, Row } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {
  return (
    <Row>
        <Col lg={3}>
            <AdminNavbar active='' />
        </Col>
        <Col lg={9}>
            <h3 className='welcome'>Welcome To Admin Dashboard</h3>
        </Col>
    </Row>
  )
}

export default AdminDashboard