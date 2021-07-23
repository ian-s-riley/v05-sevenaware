import React from "react";

// reactstrap components
import {
    Form,
    Row,
    Col,
    Label,
} from "reactstrap";

function IneligibleYes() {
    return (
        <Form className="settings-form">
            <Row>
            <Col className="ml-auto mr-auto" md="10">
                <Label>
                Your business is ineligible not quality for a 7(a) loan from the SBA due to ineligible business activity.
                </Label>
            </Col>
            </Row>               
        </Form>
        
    );
}

export default IneligibleYes;
