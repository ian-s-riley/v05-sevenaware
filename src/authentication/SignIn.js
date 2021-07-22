import React, { useState } from "react";

/* Import the Amplify Auth API */
import { Auth } from 'aws-amplify';

import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

import AuthNavBar from "components/Navbars/AuthNavBar";
import AuthHeader from "components/Headers/AuthHeader";
import FooterAuth from "components/Footers/FooterAuth";

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Label,
  FormText,
  Input,
  Container,
  Row,
  Col,
  Modal,
} from "reactstrap";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

function SignIn() {   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailState, setEmailState] = useState("");
    const [passwordState, setPasswordState] = useState("");

    const [loading, setLoading] = useState(false);
    const [invalid, setInvalid] = useState(false);

    /* Sign in function */
    async function signIn() {
        setLoading(true)
        try {
        await Auth.signIn(email, password);
        //App.js is listening to the Auth Hub and will handle the login routes

        } catch (err) { 
            setLoading(false)
            setInvalid(true)
            console.log({ err }); 
        }
    }

    // function that returns true if value is email, false otherwise
    const verifyEmail = value => {        
        //console.log('verifyEmail - value', value)
        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(value) && value.length > 0) {
        return true;
        }
        return false;
    };

    const verifyPassword = value => {
        //console.log('verifyPassword - value', value)
        var passwordRex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
        if (passwordRex.test(value) && value.length > 0) {
        return true;
        }
        return false;
    };

  return (
    <>
      <AuthNavBar />
      <div className="wrapper">
        <AuthHeader />
        <div className="profile-content section-white-gray">
          <Container>
            <Row className="owner">
              <Col className="ml-auto mr-auto text-center" md="6" sm="6" xs="6">
                <div className="name">
                <h4>
                    Please sign into your account.
                </h4>
                </div>
              </Col>
            </Row>
            <div className="profile-tabs">              
              <div className="profile-content section">
                <Container>        
                <Row>
                    <Col className="ml-auto mr-auto" md="6">
                    <Form className="settings-form">                
                        <FormGroup className={emailState === "success" ? "has-success" : null}>
                        <Label for="emailId" className="control-label">Email Address</Label>
                        <Input 
                        type="text" 
                        name="emailId" 
                        id="emailId" 
                        onChange = {event => {
                            if (verifyEmail(event.target.value)) {
                                setEmailState("success");
                            } else {
                                setEmailState("error");
                            }
                            setEmail(event.target.value);
                            }}
                        />    
                        <FormText></FormText>     
                    </FormGroup> 
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
                    <div className="text-center">
                    {loading ? (
                        <div className="sweet-loading">
                            <PulseLoader color={"#175e11"} loading={loading} css={override} size={15} />
                        </div> 
                    ) : (
                        <Button
                        className="btn-round"
                        onClick={signIn}
                        color="primary"
                        size="md"
                    >
                        Sign In
                    </Button>
                    )}            
                    </div>               
                    </Form>
                    </Col>
                </Row>
                </Container>
                <Modal isOpen={invalid} toggle={() => setInvalid(false)}>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLiveLabel">
                    Login Warning
                  </h5>
                  <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => setInvalid(false)}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>This email/username (<small>{email}</small>) & password combination are not valid. Please try to sign in again.</p>          
                </div>
              </Modal>
            </div>
            </div>
          </Container>
        </div>
      </div>
      <FooterAuth />
    </>                
  );
}

export default SignIn;
