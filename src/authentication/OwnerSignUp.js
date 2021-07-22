import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

/* Import the Amplify Auth API */
import { Auth } from 'aws-amplify';

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import {
    createUser as createUserMutation,
} from '../graphql/mutations';
import { listNotifications } from '../graphql/queries';

// redux store
import { useDispatch } from 'react-redux';
import {
    updateForm,
} from 'features/form/formSlice'

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
    UncontrolledTooltip,
    Modal,
} from "reactstrap";

function OwnerSignUp(prop) {
    const history = useHistory()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailState, setEmailState] = useState("success");
    const [passwordState, setPasswordState] = useState("");
    const [password2State, setPassword2State] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const [agreeSevenAware, setAgreeSevenAware] = useState(false);

    const search = useLocation().search;
    const jwt = new URLSearchParams(search).get('jwt');

    useEffect(() => {
        checkOneTimeLink()
    }, [])

    async function checkOneTimeLink() {
        //lookup the email by the user token              
        if (jwt) {
            console.log('checkOneTimeLink: checkOneTimeLink', jwt)

            const apiData = await API.graphql(graphqlOperation(listNotifications, {
                filter: { id: { eq: jwt }, oneTimeLinkUseDate: { attributeExists: false } },
            }))
            const notificationsFromAPI = apiData.data.listNotifications.items
            
            //if there's still a valid one time link (hasn't been used and less than 3 days old)
            if (notificationsFromAPI.length > 0) {
                const ownerEmail = notificationsFromAPI[0].fromUserId
                console.log('fetchNotifications: notificationsFromAPI', ownerEmail)
                setEmail(ownerEmail)
                //setEmailState("success")

                //lookup the original application to get the business' info
            } else {
                setErrorMessage(
                    
                )
            }
        }
    }

    async function handleSignUp() {
        //validation
        if (emailState !== "success") { return false }
        if (passwordState !== "success") { return false }
        if (password2State !== "success") { return false }
        if (!agreeSevenAware) { return false }

        //amplify auth sign up
        try {
            const { user } = await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    email: email,
                    'custom:userType': 'Owner'
                }
            });
            /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
            //create the user record
            createNewUserAndForm(user.username)
        } catch (err) {
            console.log({ err })
            setErrorMessage(<p>Your email/username (<small>{email}</small>) already already exists in the system. Please sign in or verify your account to continue.</p>)
        }

    };

    //save the new user and form
    async function createNewUserAndForm(newUserName) {
        //create the new user
        await API.graphql(
            {
                query: createUserMutation,
                variables: {
                    input: {
                        userId: newUserName,
                        userType: "Borrower",
                        email: email,
                        sevenAwareAgree: true,
                    }
                }
            }
        )

        //go to the next step, stage, or form
        history.replace("/verify")
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

        var passwordRex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`])\S{8,99}$/
        //console.log('verifyPassword - passwordRex.test(' + value + ')', passwordRex.test(value))
        if (passwordRex.test(value) && value.length > 0) {
            return true;
        }
        return false;
    };

    const verifyPassword2 = value => {
        if (value === password) {
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
                        <Row>
                            <Col className="d-flex align-items-center justify-content-center" md="2"></Col>
                            <Col className="ml-auto mr-auto" md="8">

                                <Form className="settings-form">
                                    <Row>
                                        <Col className="ml-auto mr-auto h5" md="12">
                                            <FormGroup className={emailState === "success" ? "has-success" : null}>
                                                <Label for="businessEmail" className="control-label">Email Address (User ID)</Label>
                                                <Input
                                                    type="text"
                                                    name="businessEmail"
                                                    id="businessEmail"
                                                    value={email}
                                                    onChange={event => {
                                                        if (verifyEmail(event.target.value)) {
                                                            setEmailState("success");
                                                        } else {
                                                            setEmailState("error");
                                                        }
                                                        setEmail(event.target.value);
                                                    }}
                                                />
                                                <FormText>
                                                    Once you sign up and verify your account, you'll be invited to add all the information the SBA needs for {"COMPANY NAME"}'s application.
                                                </FormText>
                                            </FormGroup>
                                            <Row>
                                                <Col className="ml-auto mr-auto" md="6">
                                                    <FormGroup className={passwordState === "success" ? "has-success" : null}>
                                                        <Label for="password">Password</Label>
                                                        <Input
                                                            type="password"
                                                            name="password"
                                                            id="password"
                                                            placeholder="Password"
                                                            autoComplete="off"
                                                            onChange={event => {
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
                                                    <FormGroup className={password2State === "success" ? "has-success" : null}>
                                                        <Label for="password2">Confirm Password</Label>
                                                        <Input
                                                            type="password"
                                                            name="password2"
                                                            id="password2"
                                                            autoComplete="off"
                                                            onChange={event => {
                                                                if (verifyPassword2(event.target.value)) {
                                                                    setPassword2State("success");
                                                                } else {
                                                                    setPassword2State("error");
                                                                }
                                                            }}
                                                        />
                                                    </FormGroup>


                                                </Col>
                                            </Row>

                                            <FormGroup check>
                                                <Label check>
                                                    <Input
                                                        id="agreeSevenAware"
                                                        type="checkbox"
                                                        defaultChecked={agreeSevenAware}
                                                        onClick={() => setAgreeSevenAware(!agreeSevenAware)}
                                                    />{' '}
                                                    I understand how 7(a)ware will use and protect my data. And I agree to the terms & conditions.
                                                    <span className="form-check-sign">
                                                        <span className="check"></span>
                                                    </span>
                                                </Label>
                                            </FormGroup>

                                            <FormGroup>
                                        
                                            </FormGroup>


                                        </Col>
                                    </Row>
                                    <Row>
                                    <Col className="ml-auto mr-auto" md="4">
                                    <Button
                  className="btn-round "
                  onClick={handleSignUp}
                  color="primary"
                  id="tooltip924342661"
              >
                  Sign Up
                  <i className="nc-icon nc-minimal-right" />
              </Button>
                                    </Col>
                                    </Row>
                                    

                                </Form>

                            </Col>
                            <Col className="d-flex align-items-center" md="2">


                            </Col>
                        </Row>
                    </Container>
                </div>
                <Modal isOpen={errorMessage} toggle={() => setErrorMessage(null)}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLiveLabel">
                            You've already got an account.
                        </h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => setErrorMessage(null)}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {errorMessage}
                    </div>
                </Modal>
            </div>
            <FooterAuth />
        </>


    );
}

export default OwnerSignUp;
