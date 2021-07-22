import React, {useState, useEffect} from "react";

// redux store
import { useDispatch } from 'react-redux';
import {
  updateFormAsync,  
} from 'features/form/formSlice'

import InputMask from "react-input-mask";

// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Label,
  Input,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  FormText,
  Modal,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

// core components
import Buttons from "../opportunity-sections/Buttons";

function ProfileSSN(prop) {
    const dispatch = useDispatch()
    
    const [form, setForm] = useState(prop.form)
    const [isDirty, setIsDirty] = useState(false)
    const [idState, setIDState] = useState("");
    const [idType, setIdType] = useState("SSN");
    const [id, setId] = useState("");
    const [tinExpiration, setTinExpiration] = useState(null);
    const [idError, setIdError] = useState(false);

    useEffect(() => {
      if (prop.form.ssn !== "") {
          setIdType("SSN")
          setId(prop.form.ssn)
      } else {
          setIdType("TIN")
          setId(prop.form.tin)
          setTinExpiration(prop.form.tinExpiration)
      }
    }, [])  

    //const thisScreenId = "Profile>SSN"
    let nextScreenId = "Profile>JointTaxes"
    let percentComplete = "20"

    const handleNextClick = () => {   
        //validation
        if (idState !== "success" && isDirty) {
            setIdError(true)
            return
        }        
        if (idType === "TIN" && !tinExpiration) return 

        //save the new form to the navigation path for this user    
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.push(nextScreenId)

        //var options = { year: 'numeric', month: 'long', day: 'numeric' };
        let tinExpiry =  tinExpiration ? (tinExpiration.toString()) : (null);
        console.log('handleNextClick: tinExpiry',tinExpiry)

        let newForm = null
        if (isDirty) {
          //update the local form store 
          newForm = { 
            ...form, 
            ssn: idType === "SSN" ? (id) : (""),
            tin: idType === "SSN" ? ("") : (id),
            tinExpiration: idType === "SSN" ? ("") : (tinExpiry),
            screenNavigation: screenNavigation.join(','),
            percentComplete: percentComplete,
          }                           

          //update redux & graphql
          dispatch(updateFormAsync(newForm))

          //send a notification          
        }

        //go to the next step, stage, or form
        prop.nextForm(newForm, screenNavigation)
    };

    const handleBackClick = () => {
        let screenNavigation = Object.assign([], prop.navigation);
        screenNavigation.pop()
        prop.nextForm(null, screenNavigation)
    }

    // function that returns true if value is email, false otherwise
    const verifyID = value => {         
        //console.log('verifyID - value:', value.substr(0,3))
        if (value.substr(0,3) === '666' || value.substr(0,3) === '000') {return false}
        var idRex = /^[0-9-]*$/;
        if (idRex.test(value)) {
            return true;
        }
        return false;
    };

    function handleChange(e) {
        const {id, value} = e.currentTarget;        
        if (value[0] === "9") {
            setIdType("TIN")
        } else {
            setIdType("SSN")
        }        
        setId(value)
        setIsDirty(true)
    }

    function handleDateChange(e) {
      console.log('handleDateChange - e', e)
      setTinExpiration(e._d)
      setIsDirty(true)
  }

  return (
    <div className="profile-content section">
        <Container>        
        <Row>
            <Col className="d-flex align-items-center justify-content-center" md="3"></Col>
            <Col className="" md="6">
            <Form className="settings-form">
              <Label>You indicated that you operate as a {form.entityType}.  Therefore, you use your Social Security Number or Individual Taxpayer Identification Number as your Taxpayer Identification Number, please enter it now:</Label>
                <FormGroup className={idState === "success" ? "has-success" : null}>
                    <Label for="ssn" className="control-label">{idType}</Label>
                    <InputMask 
                        id="id"
                        mask="999-99-9999" 
                        maskPlaceholder="#"
                        value={id || ""}
                        alwaysShowMask={true}
                        onChange = {event => {
                        if (verifyID(event.target.value)) {
                            setIDState("success");
                        } else {
                            setIDState("error");
                        }
                        handleChange(event)
                        }}
                    >
                    <Input 
                        type="text"                 
                    />       
                    </InputMask>
                </FormGroup>  
                {idType === "TIN" && (                  
                    <FormGroup>
                    <Label for="ssn" className="control-label">ITIN Expiration Date</Label>
                  <InputGroup className="date" id="datetimepicker">
                    <ReactDatetime
                      onChange={handleDateChange}
                      value={form.tinExpiration}
                      timeFormat={false}
                      inputProps={{
                        className: "form-control",
                      }}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <span className="glyphicon glyphicon-calendar">
                          <i className="fa fa-calendar" />
                        </span>
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FormText>
                    It appears that you applied to the U.S. Government for an Individual Tax Identification ({id}) as your number which you use this as your TIN.  Please indicate the date that it expires.
                  </FormText>
                </FormGroup>
                )} 
            </Form>

            </Col>
            <Col className="d-flex align-items-center justify-content-center" md="3">

                <Buttons next={handleNextClick} back={handleBackClick}/>

            </Col>
        </Row>
        </Container>
        <Modal isOpen={idError} toggle={() => setIdError(false)}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLiveLabel">
            Incorrect {idType}
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setIdError(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>It looks like you have not entered a valid {idType}</p>          
        </div>
      </Modal>
    </div> 
  );
}

export default ProfileSSN;
