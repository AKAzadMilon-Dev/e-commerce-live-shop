import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import {Store} from '../Store'

const Affiliate = () => {

    const [agree, setAgree] = useState(false)

    const {state3, dispatch3} = useContext(Store)

    const handleAgree = async ()=>{
        setAgree(!agree)
    }

    const handleAffiliate = async ()=>{
        let {data} = await axios.put(`/api/userSignin/affiliate/${state3.userInfo._id}`)
        console.log(data)
        dispatch3({type:"USER_SIGNIN", payload:data})
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
  return (
    <Container>
        <p>All sales of goods and services by a vendor (“Vendor”) to Ulterra Drilling Tecnologías, L.P. and each of its parents, affiliates and subsidiaries (“Ulterra”) are subject to these standard terms and conditions of purchase (these “Terms”). Any accompanying purchase order (the “Purchase Order”) and these Terms (collectively, this “Agreement”) comprise the entire agreement between the parties, and supersede all prior or contemporaneous understandings, agreements, negotiations, representations and warranties, and communications, both written and oral. Terms and conditions of Vendor (whether contained in a purchase order confirmation or otherwise) that are in any way in conflict or inconsistent with or different or in addition to this Agreement (whether communicated orally or contained in a sales confirmation, delivery ticket, invoice or other written correspondence) shall not be binding on Ulterra and are rejected and shall not be considered applicable to any purchase of goods or services by Ulterra unless expressly agreed to in writing by Ulterra. The supply of goods or services to Ulterra pursuant to any purchase order or similar order of goods or services by Ulterra shall be conclusive evidence of Vendor’s approval of and consent to this Agreement.</p>

        <Form>
            <Form.Check
                onChange={handleAgree}
                className="mb-3"
                type="checkbox"
                label={"Accept the term and condition"}
            />
            {agree
            ?
            <Button variant="primary" onClick={handleAffiliate}>Primary</Button>
            :
            <Button variant="primary" disabled>Primary</Button>
            }
        </Form>
    </Container>
  )
}

export default Affiliate