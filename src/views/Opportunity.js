/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

// redux store
import { useSelector, connect } from 'react-redux';
import {
  selectForm,
} from 'features/form/formSlice'

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,  
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

function Opportunity(props) {
  const history = useHistory()
  const [authState, setAuthState] = useState("eligibility")  
  const [screenNavigation, setScreenNavigation] = useState(["Eligibility>"])  
  const [screenHeader, setScreenHeader] = useState("")

  //const thisForm = useState(useSelector(selectForm))
  const [form, setForm] = useState(useSelector(selectForm))
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
      case "Profile>ConfirmSignUp":
        setScreenHeader("Verify 7(a)ware Account Profile")
        setCurrentPage(<ProfileConfirmSignUp />)
        break;
      case "SignUp>":
        setScreenHeader("7(a)ware Account Profile")
        setCurrentPage(<ProfileSignUp />)
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

  const handleNextClick = () => {
    const screenId = screenNavigation.slice(-1)[0];
    console.log('Opportunity.js - handleNextClick - screenId', screenId)
    //console.log('Opportunity.js - handleNextClick - props', props)

    let nextScreenId = ""

    switch (screenId) {
      case "Eligibility>":
        //set next step
        nextScreenId = "Eligibility>ForProfit"
        if (props.form.ineligible) { nextScreenId = "Eligibility>Ineligible" }

        //validate data
        //update form
        //send a notification
        break;        
       case "Eligibility>ForProfit":
        //set next step
        nextScreenId = "Eligibility>US"
        if (!props.form.forProfit) { nextScreenId = "Eligibility>NotForProfit" }

        //validate data
        //update form
        //send a notification
        break; 
      case "Eligibility>US":
        //set next step
        nextScreenId = "Eligible>"
        if (!props.form.us) { nextScreenId = "Eligibility>Non-US" }

        //validate data
        //update form
        //send a notification
        break; 
      case "Eligible>":
        //set next step
        nextScreenId = "SignUp>"

        //validate data
        //update form
        //send a notification
        break; 
      default:
      //don't save the form
    }
    
    //show the next step, stage, or form
    let newScreenNavigation = Object.assign([], screenNavigation);
    console.log('Opportunity.js - handleNextClick - newScreenNavigation', newScreenNavigation)
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
      <FooterGray />
    </>
  );
}

export default connect(mapStateToProps)(Opportunity);
