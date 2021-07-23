import React from "react";

// redux store
import { useDispatch, connect } from 'react-redux';
import {
  updateIneligible, 
} from 'features/form/formSlice'

// reactstrap components
import {
  Form,
  Row,
  Col,
  CustomInput,
  Nav, 
  NavItem, 
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

const mapStateToProps = (state) => {
  //console.log('mapStateToProps - state.form', state.form)
  return {
     ineligible: state.form.ineligible,
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   console.log('ownProps', ownProps)
//   return {
//      update: () => dispatch(updateIneligible()),
//   };
// };

function Ineligible(props) {
  const dispatch = useDispatch()
  
  //const [form, setForm] = useState(useSelector(selectForm))
  const [vTabs, setVTabs] = React.useState("1");

  function handleChange(e) {
      const { id, checked } = e.currentTarget;

      //update redux
      //console.log('handleChange - checked', checked)        
      dispatch(updateIneligible({ineligible: checked}))
  }

  return (
    <Form className="settings-form">
      <Row>
          <Col md="4" sm="4" xs="6">
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">
                <Nav
                  className="flex-column nav-stacked"
                  role="tablist"
                  tabs
                >
                  <NavItem>
                    <NavLink
                      className={vTabs === "1" ? "active" : ""}
                      onClick={() => {
                        setVTabs("1");
                      }}
                    >
                      Non-Profits?
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={vTabs === "2" ? "active" : ""}
                      onClick={() => {
                        setVTabs("2");
                      }}
                    >
                      REIs?
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={vTabs === "3" ? "active" : ""}
                      onClick={() => {
                        setVTabs("3");
                      }}
                    >
                      Lending?
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={vTabs === "4" ? "active" : ""}
                      onClick={() => {
                        setVTabs("4");
                      }}
                    >
                      MML?
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={vTabs === "5" ? "active" : ""}
                      onClick={() => {
                        setVTabs("5");
                      }}
                    >
                      Gambling?
                    </NavLink>
                  </NavItem>                       
                  <NavItem>
                    <NavLink
                      className={vTabs === "5" ? "active" : ""}
                      onClick={() => {
                        setVTabs("6");
                      }}
                    >
                      Illegal Activities?
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={vTabs === "5" ? "active" : ""}
                      onClick={() => {
                        setVTabs("7");
                      }}
                    >
                      Speculative Trading?
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </div>
          </Col>
          <Col md="8" sm="8" xs="6">
            {/* Tab panes */}
            <TabContent activeTab={"vTabs" + vTabs}>
              <TabPane tabId="vTabs1">
                <br />
                <p>
                  Consumer and marketing cooperatives, charitable, religious, or other non-profit institutions.
                </p>
              </TabPane>
              <TabPane tabId="vTabs2">
                <br />
                <p>
                  Real estate investment firms.
                </p>
              </TabPane>
              <TabPane tabId="vTabs3">
                <br />
                <p>
                  Firms involved in lending activities, such as leasing companies, finance companies, and any firm whose stock in trade is money.
                </p>
              </TabPane>
              <TabPane tabId="vTabs4">
                <br />
                <p>
                  Pyramid sales plans & multi-level marketing.
                </p>
                <br/>
                <p>
                In multi-level marketing, the compensation plan theoretically pays out to participants only from two potential revenue streams. The first is paid out from commissions of sales made by the participants directly to their own retail customers. The second is paid out from commissions based upon the wholesale purchases made by other distributors below the participant who have recruited those other participants into the MLM.
                </p>
              </TabPane>
              <TabPane tabId="vTabs5">
              <br /><p>Firms involved in gambling activities.</p>
              </TabPane>
              <TabPane tabId="vTabs6">
              <br /><p>Firms involved in illegal activities that are against the law in the jurisdiction where the business is located (including cannabis).</p>
              </TabPane>       
              <TabPane tabId="vTabs7">
              <br /><p>Speculative trading activities, dealing in rare coins or stamps.</p>
              </TabPane>                    
            </TabContent>
          </Col>
        </Row>
        <Row>
          <Col className="ml-auto mr-auto" md="10">
          <CustomInput
                type="switch"
                defaultChecked={props.ineligible}
                onChange={handleChange}
                id="ineligible"
                name="ineligible"
                className="custom-switch-primary h5"
                label={!props.ineligible ? ("No, our business does not receive revenue from any of these sources") : ("Yes, our business receives revenue from one or more of these sources.")}
              />
          </Col>
        </Row>               
      </Form>
  );
}

export default connect(mapStateToProps)(Ineligible)
