/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

/* Import the Amplify Auth API */
import { Auth } from 'aws-amplify';

//AWS Amplify GraphQL libraries
import { API } from 'aws-amplify';
import { 
    createUser as createUserMutation, 
    createForm as createFormMutation,
} from '../graphql/mutations';

// redux store
import { useDispatch, connect } from 'react-redux';
import {
  updateNewForm,
} from 'features/form/formSlice'

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col, 
  Modal, 
} from "reactstrap";

// core components
import AuthNavBar from "components/Navbars/AuthNavBar.js";
import AuthHeader from "components/Headers/AuthHeader.js";
import FooterGray from "components/Footers/FooterGray.js";

import Ineligible from "./opportunity-sections/Ineligible";
import IneligibleYes from "./opportunity-sections/IneligibleYes";
import ForProfit from "./opportunity-sections/ForProfit";
import ForProfitNo from "./opportunity-sections/ForProfitNo";
import US from "./opportunity-sections/US";
import USNo from "./opportunity-sections/USNo";
import Eligible from "./opportunity-sections/Eligible";
import ProfileSignUp from "./opportunity-sections/ProfileSignUp";

const mapStateToProps = (state) => {
  //console.log('mapStateToProps - state.form', state.form)
  return {
     form: state.form
  };
};

const currentSOPVersion = "2021-v04.34"

function Opportunity(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  
  const [screenNavigation, setScreenNavigation] = useState(["Eligibility>"])  
  const [screenHeader, setScreenHeader] = useState("")

  const [emailState, setEmailState] = useState("")
  const [passwordState, setPasswordState] = useState("")
  const [passwordMatchState, setPasswordMatchState] = useState("")
  
  const [authState, setAuthState] = useState("eligibility")  
  const [userExists, setUserExists] = useState(false)  
  const [modal, setModal] = useState({visible: false, title: "", message: ""}) 

  //console.log('opportunity.js - form', form)
  const [currentPage, setCurrentPage] = useState()
  const [showNext, setShowNext] = useState(true)

  useEffect(() => {
    showScreen()
  }, [screenNavigation])

  const showScreen = () => {
    setShowNext(true)
    const screenId = screenNavigation.slice(-1)[0];
    console.log("showScreen - screenId", screenId)
    switch (screenId) {
      case "SignUp>Verify":
        history.replace("/verify")
      case "SignUp>":
        setScreenHeader("7(a)ware Account Profile")
        setCurrentPage(
          <ProfileSignUp 
            emailState={emailState}
            setEmailState={setEmailState}
            passwordState={passwordState}
            setPasswordState={setPasswordState}
            passwordMatchState={passwordMatchState}
            setPasswordMatchState={setPasswordMatchState}
          />)
        break;
      case "Eligible>":
        setScreenHeader("It looks like your business is eligible for a 7(a) loan.")
        setCurrentPage(<Eligible />)
        break;
      case "Eligibility>Non-US":
        setScreenHeader("Eligibility Warning")
        setCurrentPage(<USNo />)
        break;
      case "Eligibility>US":
        setScreenHeader("Is your business entity established & located in the US or its territories?")
        setCurrentPage(<US />)
        break;
      case "Eligibility>NotForProfit":
        setScreenHeader("Eligibility Warning")
        setCurrentPage(<ForProfitNo />)
        break;
      case "Eligibility>ForProfit":
        setScreenHeader("Is your business a for-profit entity?")
        setCurrentPage(<ForProfit />)
        break;
      case "Eligibility>Ineligible":
        setScreenHeader("Eligibility Warning")
        setCurrentPage(<IneligibleYes />)
        break;
      case "Eligibility>":
        setScreenHeader("Are you in one of the following industries?")
        setCurrentPage(<Ineligible />)
        break;
      default:
        setScreenHeader("Are you in one of the following industries?")
        setCurrentPage(<Ineligible />)
        break;
    }
  };

  const gotoSignIn = () => {
    setAuthState("signIn")
    setScreenNavigation(["SignIn"])
  };

  const gotoEligibility = () => {
    setAuthState("eligibility")
    setScreenNavigation(["Start"])
  };

  const gotoConfirmSignUp = () => {
    setAuthState("confirmSignUp")
    setScreenNavigation(["Profile>ConfirmSignUp"])
  };  

  async function createNewUserAndForm() {
    //console.log('createNewUserAndForm - props.form', props.form)
    const newUserData = {
      userId: props.form.userId,      
      password: props.form.password,
      userType: "Borrower",
      //userRole: "Primary Contact"
      email: props.form.userId,
      sevenAwareAgree: true,
    }

    //amplify auth sign up
    try {
      const { user } = await Auth.signUp({
          username: newUserData.userId,
          password: newUserData.password,
          attributes: {
              email: newUserData.userId
          }});
          
          /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
          
          //create the new user in the DB    
          const apiUserData = await API.graphql({ 
            query: 
              createUserMutation, 
              variables: { input: newUserData} 
          })
          console.log('newUserAndForm - apiUserData', apiUserData)
          const newUserId = apiUserData.data.createUser.id    
          
          //create the new form/application
          const newFormData = {   
              sopVersion: currentSOPVersion,
              userId: newUserData.userId,   
              //authorizedUserId: props.form.authorizedUserId
              screenNavigation: "Profile>", 
              ineligible: false,
              forProfit: true,
              us: true,
              businessEmail: newUserData.userId,
          }    

          //create the new form for this user
          const apiFormData = await API.graphql(
              { query: createFormMutation, 
                  variables: { input: newFormData } 
              }
          )
          const newFormId = apiFormData.data.createForm.id    
          const newForm = {...newFormData, id: newFormId}
          console.log('newUserAndForm - newForm', newForm)


          //update redux                      
          dispatch(updateNewForm({
            newForm
          })) 

          //send new user notification to lender

          //create a new AWS authenticated user, and invite the 2 factor verification


          //  //go to the next step, stage, or form
          //  history.replace("/verify") 



    } catch (err) { 
      //show an error
      console.log({ err })    
      setModal({visible: true, title: "SignUp Warning", message: "There is already a 7(a)ware user with this email (" + props.form.userId + "). Please sign in instead."})            
      return false
    }
    
       
};

  const handleNextClick = () => {
    const screenId = screenNavigation.slice(-1)[0];
    //console.log('Opportunity.js - handleNextClick - screenId', screenId)
    //console.log('Opportunity.js - handleNextClick - props', props)

    let nextScreenId = ""

    switch (screenId) {
      case "Eligibility>":
        //set next step
        nextScreenId = "Eligibility>ForProfit"
        if (props.form.ineligible) { nextScreenId = "Eligibility>Ineligible" }
        break;        
       case "Eligibility>ForProfit":
        //set next step
        nextScreenId = "Eligibility>US"
        if (!props.form.forProfit) { nextScreenId = "Eligibility>NotForProfit" }
        break; 
      case "Eligibility>US":
        //set next step
        nextScreenId = "Eligible>"
        if (!props.form.us) { nextScreenId = "Eligibility>Non-US" }
        break; 
      case "Eligible>":
        //set next step
        nextScreenId = "SignUp>"
        break; 
      case "SignUp>":
        //set next step
        nextScreenId = "SignUp>Verify"

        //validation
        if (emailState === "error") {
          setModal({visible: true, title: "Oops... email!", message:"Please enter a valid email address to verify your new account."})
          return false
        }
        if (passwordState === "error") {
          setModal({visible: true, title: "Oops... password", message:"You must enter a secure password: at lease 8 characters long and contain at least 1 upper case letter, 1 lower case letter, 1 number, and one special character."})
          return false
        }
        if (passwordMatchState === "error") {
          setModal({visible: true, title: "Oops... password mismatch", message:"Please make sure your passwords match."})
          return false
        }
        // if (passwordState !== "success") {return false}
        // if (passwordMatchState !== "success") {return false}
        // if (!agreeSevenAware) {return false}        

        //create the new 7(a)ware user/application
        createNewUserAndForm()
        break; 
      default:
      //don't save the form
    }
    
    //show the next step, stage, or form
    let newScreenNavigation = Object.assign([], screenNavigation);
    //console.log('Opportunity.js - handleNextClick - newScreenNavigation', newScreenNavigation)
    newScreenNavigation.push(nextScreenId)    
    setScreenNavigation(newScreenNavigation)
  }

  const handleBackClick = () => {
    //console.log('handleBackClick - screenNavigation', screenNavigation)
    let newScreenNavigation = Object.assign([], screenNavigation);
    newScreenNavigation.pop()
    //console.log('handleBackClick - newScreenNavigation', newScreenNavigation)    
    if (newScreenNavigation.length === 0) {
      //back to the landing page
      history.replace("/landing")
    } else {
      setScreenNavigation(newScreenNavigation)
    }    
  }

  return (
    <>
      <AuthNavBar />
      <AuthHeader />
      <div className="wrapper">
        <Row>
          <Col className="ml-auto mr-auto text-center" md="6" sm="6" xs="6">
            <div className="d-flex align-items-center justify-content-center">
              <h4>
                {screenHeader}
              </h4>
            </div>
          </Col>
        </Row>
        <div>
          <div className="profile-content section">
            <Container>
              <Row>

                <Col className="d-flex align-items-center justify-content-end" md="2">

                  <Button
                    className="btn-just-icon mr-1"
                    color="default"
                    type="button"
                    outline
                    size="lg"
                    onClick={handleBackClick}
                  >
                    <i className="fa fa-angle-left" />
                  </Button>

                </Col>

                <Col className="ml-auto mr-auto" md="8">

                  {currentPage}

                </Col>
                <Col className="d-flex align-items-center justify-content-start" md="2">
                  {showNext && (
                    <Button
                    className="btn-just-icon mr-1"
                    color="primary"
                    type="button"
                    size="lg"
                    onClick={handleNextClick}
                  >
                    <i className="fa fa-angle-right" />
                  </Button>
                  )}                 
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <Modal isOpen={modal.visible} toggle={() => setModal({visible: false, title: "", message: ""})}>
        <div className="modal-header">
            <h5 className="modal-title">
                {modal.title}
            </h5>
            <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => setModal({visible: false, title: "", message: ""})}
            >
                <span aria-hidden={true}>×</span>
            </button>
        </div>
        <div className="modal-body">
            {modal.message}
        </div>
    </Modal>
      <FooterGray />
    </>
  );
}

export default connect(mapStateToProps)(Opportunity);
