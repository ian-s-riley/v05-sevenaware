import React, {useState} from "react";
import { useHistory } from "react-router-dom";

// redux store
import { useDispatch, connect } from 'react-redux';
import {
  updateSignUpProfile,
} from 'features/form/formSlice'

// reactstrap components
import {
  FormGroup,
  Form,
  Label,
  FormText,
  Input,
  Row,
  Col,
} from "reactstrap";

const mapStateToProps = (state) => {
    //console.log('mapStateToProps - state.form', state.form)
    return {
        signUpProfile: {
            userId: state.form.userId,
            password: state.form.password,
        }        
    };
  };

function ProfileSignUp(props) {
    const dispatch = useDispatch()

    const [authorizedSignatory, setAuthorizedSigantory] = useState(false); 
    const [authorizedSignatoryUserIdState, setauthorizedSignatoryUserIdState] = useState("")
    const [sevenAwareAgree, setSevenAwareAgree] = useState(false)      

    // function that returns true if value is email, false otherwise
    const verifyEmail = value => {        
        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(value) && value.length > 0) {
        return true;
        }
        return false;
    };

    const verifyPassword = value => {      
        var passwordRex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`])\S{8,99}$/
        //console.log('verifyPassword - passwordRex.test(' + value + ')', passwordRex.test(value))
        if (passwordRex.test(value) && value.length > 0) {
        return true;
        }
        return false;
    };

    const verifyPasswordMatch = value => {        
        if (value === props.signUpProfile.password) {
        return true;
        }
        return false;
    };

    function handleChange(e) {
        const { id, value } = e.currentTarget;         
        const newSignUpProfile = {...props.signUpProfile, [id]: value}

        //update redux                      
        dispatch(updateSignUpProfile({
            userId: newSignUpProfile.userId,
            password: newSignUpProfile.password,
        })) 
    }

    function resetAuthorizedSignatory() {        
        // //update redux                   
        // const newSignUpProfile = {...props.signUpProfile, authorizedSignatoryUserId: ""}   
        // dispatch(updateSignUpProfile({
        //     userId: newSignUpProfile.userId,
        //     password: newSignUpProfile.password,
        // })) 
    }

  return (
    <Form className="settings-form">     
                <Row>
                <Col className="ml-auto mr-auto h5" md="10">
                <FormGroup className={props.emailState === "success" ? "has-success" : null}>
                <Label for="userId" className="control-label">Email Address (User ID)</Label>
                <Input 
                type="text" 
                name="userId" 
                id="userId" 
                defaultValue={props.signUpProfile.userId}
                onChange = {event => {
                    if (verifyEmail(event.target.value)) {
                        props.setEmailState("success");
                    } else {
                        props.setEmailState("error");
                    }
                    handleChange(event)
                    }}
                />                       
            </FormGroup> 
            <Row>
            <Col className="ml-auto mr-auto" md="6">
            <FormGroup className={props.passwordState === "success" ? "has-success" : null}>
                <Label for="password">Password</Label>
                <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                autoComplete="off"
                onChange = {event => {
                    if (verifyPassword(event.target.value)) {
                        props.setPasswordState("success");
                    } else {
                        props.setPasswordState("error");
                    }
                    handleChange(event)
                    }}
                />    
            </FormGroup>
            </Col>
            <Col className="ml-auto mr-auto" md="6">
            <FormGroup className={props.passwordMatchState === "success" ? "has-success" : null}>
                <Label for="password2">Confirm Password</Label>
                <Input
                type="password"
                name="password2"
                id="password2"
                autoComplete="off"
                onChange = {event => {
                    if (verifyPasswordMatch(event.target.value)) {
                        props.passwordMatchState("success");
                    } else {
                        props.passwordMatchState("error");
                    }
                    }}
                />
            </FormGroup>

            </Col>
            </Row>

                

                {!authorizedSignatory && (
                    <FormGroup>
                <FormText>
                We recommend an equity owner that is an authorized person create the account. <a href="#" onClick={() => setAuthorizedSigantory(true)}>
                Click here</a> to add someone else authorizied signatory.
                </FormText>     
                </FormGroup> 
                )}                    
                <br/>                
                

                {authorizedSignatory && (
                    <FormGroup className={authorizedSignatoryUserIdState === "success" ? "has-success" : null}>
                <Label for="authorizedSignatoryUserId" className="control-label">Email Address (Authorized Signatory)</Label>
                <Input 
                type="text" 
                name="authorizedSignatoryUserId" 
                id="authorizedSignatoryUserId" 
                onChange = {event => {
                    if (verifyEmail(event.target.value)) {
                        setauthorizedSignatoryUserIdState("success");
                    } else {
                        setauthorizedSignatoryUserIdState("error");
                    }
                    
                    }}
                />             
                <FormText>
                We'll invite this user to create a profile and digitally sign the necessary documentation. <a href="#" onClick={() => {
                    setAuthorizedSigantory(false)
                }}>
                Click here</a> if you should be the authorizied signatory for this business.
                </FormText>           
            </FormGroup> 
            
                )}
<br />
<FormGroup check>
                    <Label check>
                    <Input 
                        id="noFein"
                        type="checkbox" 
                        defaultChecked={sevenAwareAgree}     
                        onClick={() => setSevenAwareAgree(!sevenAwareAgree)}
                    />{' '}I understand how 7(a)ware will use my information and keep it secure.
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </Label>
                </FormGroup> 

                </Col>
                </Row>     
                
                   
                
            </Form>

  );
}

export default connect(mapStateToProps)(ProfileSignUp)
