import React from "react";

//redux store
import { useDispatch, connect } from 'react-redux';
import {
  updateForProfit, 
} from 'features/form/formSlice'

// reactstrap components
import {
  Form,
  Row,
  Col,
  CustomInput,
} from "reactstrap";

const mapStateToProps = (state) => {
  return {
     forProfit: state.form.forProfit,
  };
};

function ForProfit(props) {
  const dispatch = useDispatch()        
        
  function handleChange(e) {
    const { id, checked } = e.currentTarget;
    //update redux
    dispatch(updateForProfit({forProfit: checked}))
  }

  return (
    <Form className="settings-form">
      <Row>
      <Col className="ml-auto mr-auto" md="10">
        <Row>
          <Col className="ml-auto mr-auto" md="10">
            <br/>
            <CustomInput
              type="switch"
              defaultChecked={props.forProfit}
              onChange={handleChange}
              id="forProfit"
              name="forProfit"
              className="custom-switch-primary h5"
              label={props.forProfit ? ("Yes, this is a for profit business. ") : ("No, this is a non-profit business. ")}
            />
          </Col>
        </Row> 
        </Col>
      </Row>               
    </Form>    
  );
}

export default connect(mapStateToProps)(ForProfit)
