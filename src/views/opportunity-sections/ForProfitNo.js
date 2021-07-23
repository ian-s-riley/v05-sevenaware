import React from "react";

// reactstrap components
import {
    Form,
    Container,
    Row,
    Col,
    Label,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";

function ForProfitNo(prop) {
    
    const handleBackClick = () => {
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.pop()
        prop.nextForm(null, screenNavigation)
    }

    return (
        <Form className="settings-form">
        <Row>
          <Col className="ml-auto mr-auto" md="10">
              <Label>
              Non-profit businesses do not quality for 7(a) loans from the SBA.
              </Label>
          </Col>
        </Row>               
      </Form>
    );
}

export default ForProfitNo;
