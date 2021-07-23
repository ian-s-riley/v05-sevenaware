import React from "react";

// reactstrap components
import {
    Form,
    Row,
    Col,
    Label,
} from "reactstrap";

function USNo() {

    return (
        <Form className="settings-form">
        <Row>
          <Col className="ml-auto mr-auto" md="10">
              <Label>
              Businesses outside the US & it's terriroties do not quality for 7(a) loans from the SBA. 
              </Label>
          </Col>
        </Row>               
      </Form>
    );
}

export default USNo;
