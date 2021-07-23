import React from "react";

// reactstrap components
import {
  Form,
  Row,
  Col,
} from "reactstrap";

function Eligible() {    
  return (
    <Form className="settings-form">
    <Row>
      <Col className="ml-auto mr-auto" md="10">
          <h5>
              Continue with your application to be invited to create a secure account to continue.
              <br/><br/><small>We have found it a good practice to have an equity owner and authorized person create the account.</small>
              </h5>
      </Col>
    </Row>               
  </Form>
        
  );
}

export default Eligible;
