import React, {useState, useEffect} from "react";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFormAsync,  
  selectForm,
} from 'features/form/formSlice'

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Label,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Container,
  Row,
  Col,
  CustomInput,
  UncontrolledTooltip,
} from "reactstrap";


function ProfileEmail(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmassword, setConfirmPassword] = useState("");
    const [emailState, setEmailState] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const [confirmPasswordState, setConfirmPasswordState] = useState("");

    const thisScreenId = "Profile"
    let nextScreenId = "Profile>"
    let percentComplete = "5"

    const handleNextClick = () => {   
        //validation
        if (emailState !== "success") return
         
        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)
        
        //update the local form store 
        const newForm = { 
            ...form, 
            businessEmail: email,
            screenNavigation: screenNavigation.join(','),
            percentComplete: percentComplete,
         }
    
        //update redux & graphql
        dispatch(updateFormAsync(newForm))

        //send a notification
  
        //go to the next step, stage, or form
        prop.nextForm(newForm, screenNavigation)
    };

    const handleBackClick = () => {
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.pop()
        prop.nextForm(null, screenNavigation)
    }

    // function that returns true if value is email, false otherwise
    const verifyEmail = value => {        
        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(value) && value.length > 0) {
        return true;
        }
        return false;
    };

    const verifyPassword = value => {
        console.log('verifyPassword - value', value)
        var passwordRex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
        if (passwordRex.test(value) && value.length > 0) {
        return true;
        }
        return false;
    };

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="ml-auto mr-auto" md="6">
            <Form className="settings-form">                
            <Label className="control-label">Please enter an email address to be used as your user identification.<br/>We recommend an equity owner that is an authorized person create the account.</Label>
                <FormGroup className={emailState === "success" ? "has-success" : null}>
                <Label for="businessEmail" className="control-label">Email Address</Label>
                <Input 
                type="text" 
                name="businessEmail" 
                id="businessEmail" 
                onChange = {event => {
                    if (verifyEmail(event.target.value)) {
                        setEmailState("success");
                    } else {
                        setEmailState("error");
                    }
                    setEmail(event.target.value);
                    }}
                />         
            </FormGroup> 
            <Row>
            <Col className="ml-auto mr-auto" md="6">
            <FormGroup className={passwordState === "success" ? "has-success" : null}>
                <Label for="examplePassword">Password</Label>
                <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                autoComplete="off"
                onChange = {event => {
                    if (verifyPassword(event.target.value)) {
                        setPasswordState("success");
                    } else {
                        setPasswordState("error");
                    }
                    setPassword(event.target.value);
                    }}
                />    
            </FormGroup>
            </Col>
            <Col className="ml-auto mr-auto" md="6">
            <FormGroup>
                <Label for="examplePassword">Confirm Password</Label>
                <Input
                type="text"
                name="password2"
                id="examplePassword"
                placeholder="Password"
                autoComplete="off"
                />
            </FormGroup>

            </Col>
            </Row>
            
            <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
          I understand how 7(a)ware will <a>use and protect my data</a>. And I agree to the <a>terms & conditions</a>.
          <span className="form-check-sign">
            <span className="check"></span>
        </span>
        </Label>
      </FormGroup>
                <hr />
                <div className="text-center">
                    <Button
                        onClick={handleBackClick}
                        className="btn-just-icon pull-left"
                        id="tooltip924342662"
                        size="sm"
                    >
                        <i className="nc-icon nc-minimal-left" />
                    </Button>
                    <UncontrolledTooltip delay={0} target="tooltip924342662">
                        Previous
                    </UncontrolledTooltip>
                    <Button
                        className="btn-just-icon pull-right"
                        onClick={handleNextClick}
                        color="info"
                        id="tooltip924342661"
                        size="sm"
                    >
                        <i className="nc-icon nc-minimal-right" />
                    </Button>
                    <UncontrolledTooltip delay={0} target="tooltip924342661">
                        {nextScreenId}
                    </UncontrolledTooltip>
                </div>
            </Form>
            </Col>
        </Row>
        </Container>
    </div>
  );
}

export default ProfileEmail;
