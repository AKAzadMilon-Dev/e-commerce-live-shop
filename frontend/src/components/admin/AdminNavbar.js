import React from 'react';
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const AdminNavbar = (props) => {
  return (
    <div>
        <ListGroup as="ul">
            <ListGroup.Item as="li" className='adminPannel' ><h6>ADMIN PANNEL</h6></ListGroup.Item>
            <ListGroup.Item as="li" active={props.active == 'userlist'?true:false} >
                <Link style={{ color: `${props.active == 'userlist'?'white':'black'}`}} to='/adminuserlist'>User List</Link>
            </ListGroup.Item>
            <ListGroup.Item as="li">Product List</ListGroup.Item>
            <ListGroup.Item as="li">Product Upload</ListGroup.Item>
            <ListGroup.Item as="li">Product Approve</ListGroup.Item>
            <ListGroup.Item as="li">Category Upload</ListGroup.Item>
            <ListGroup.Item as="li">Brand</ListGroup.Item>
            <ListGroup.Item as="li">Blog</ListGroup.Item>
            <ListGroup.Item as="li" active={props.active == 'rolemanagement'?true:false} >
                <Link style={{ color: `${props.active == 'rolemanagement'?'white':'black'}`}} to='/adminrolemanagement'>Role Assign</Link>
            </ListGroup.Item>
        </ListGroup>
    </div>
  )
}

export default AdminNavbar