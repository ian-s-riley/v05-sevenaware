import React from "react";

//redux store
import { useDispatch, connect } from 'react-redux';
import {
  updateUS, 
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
     us: state.form.us,
  };
};

function US(props) {
  const dispatch = useDispatch()      

  function handleChange(e) {
    const { id, checked } = e.currentTarget;
    //update redux
    dispatch(updateUS({us: checked}))
  }

  return (
    <Form className="settings-form">
      <Row>
        <Col className="ml-auto mr-auto" md="10">
          <br/>
          <CustomInput
            type="switch"
            defaultChecked={props.us}
            onChange={handleChange}
            id="us"
            name="us"
            color="primary"
            className="custom-switch-primary h5"
            label={props.us ? ("Yes, this business is located in the US.") : ("No, this business is not located in the US.")}
          />
        </Col>
      </Row>             
    </Form>    
  );
}

export default connect(mapStateToProps)(US)
