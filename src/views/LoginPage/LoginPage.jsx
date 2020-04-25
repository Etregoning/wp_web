import React from "react";
import classNames from 'classnames'
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
// core components

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import loginPageStyle from "assets/jss/material-dashboard-react/views/loginPage.jsx";
import checkboxAdnRadioStyle from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.jsx";
import image from "assets/img/treesphoto.jpg";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// API
import { userLogin } from "api/AuthAPI";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      email: "",
      password: "",
      loginFailed: false,
      toDashboard: false,
      cardAnimaton: "cardHidden",
      isAdmin: false,
      isFlipped: false,
      flippedButton: false,
      checked: [],
      selectedEnabled: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }
  // componentWillMount() {
  //   <Route path={prop.path} component={prop.component} key={key} />
  // }

  async userLogin(e) {
    const { email, password } = this.state;
    const target = e.target.value
    try {
      let response = await fetch("https://wilderness.42.us.org/auth/sign_in", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          uid: email
        })
      });
    
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        let token_data = JSON.parse(res)
        let role =  token_data.data.user_role
     
        let accessToken = res;
        if (role === "admin") {
          localStorage.setItem("access_token", accessToken);
  
          this.setState({
            loginFailed: false,
            isFlipped: true,
          });
      }

      } else {
        let error = res;
        this.setState({
          loginFailed: true
        });
        alert("Invalid login credentials");
        throw error;
      }
    } catch (error) {
      this.setState({
        error: error,
        loginFailed: true
      });
      console.log("error: " + error);
     
    }
  }

  handleLogin(e) {
    const target = e.target.value
    if (target === "1") localStorage.setItem( "park_name", "Big Basin Redwoods State Park" )
    if (target === "3") localStorage.setItem("park_name", "Castle Rock State Park" )
    if (target === "4") localStorage.setItem("park_name", "Henry Cowell Redwoods State Park")
    if (target === "5") localStorage.setItem("park_name", "The Forest of Nisene Marks State Park" )
    if (target === "6") localStorage.setItem("park_name", "Portola Redwoods State Park" )
    if (target === "7") localStorage.setItem("park_name", "Wilder Ranch State Park" )
    if (target === "0") localStorage.setItem("park_name", "all parks" )
    localStorage.setItem("park_id", target)
    this.setState({
      toDashboard: true
    })
  }

  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }

  handleSubmit(event) {
    const email = this.state.email;
    const password = this.state.password;
   
    event.preventDefault();
    this.userLogin(event);
    // if (this.state.loginFailed ==) this.handleFlip(event)
   
    
    // this.handleFlip()
    // console.log(parkId)
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  render() {
    const { classes } = this.props;
    const wrapperDiv = classNames(
      classes.checkboxAndRadio,
      classes.checkboxAndRadioHorizontal
    );
    const name = JSON.stringify(localStorage.park_name)
    if (localStorage.length < 1){
      localStorage.setItem("park_name", "<No park selected>")
    }
    if (this.state.toDashboard === true) {
      return <Redirect to="dashboard" />;
    }
    return (
      <div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <ReactCardFlip isFlipped={this.state.isFlipped}>
                  <Card key="front" style={{ minHeight: "25vh" }}>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                      <CardHeader
                        color="success"
                        className={classes.cardHeader}
                      >
                        <h4>Please Login</h4>
                      </CardHeader>

                      <CardBody style={{ marginBottom: 50 }}>
                        <CustomInput
                          labelText="Email..."
                          id="email"
                          value={this.state.email}
                          // onChange={this.handleChange}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "email",
                            onChange: event =>
                              this.setState({ email: event.target.value }),
                            endAdornment: (
                              <InputAdornment position="end">
                                <Email className={classes.inputIconsColor} />
                              </InputAdornment>
                            )
                          }}
                        />
                        <CustomInput
                          labelText="Password"
                          id="pass"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            onChange: event =>
                              this.setState({ password: event.target.value }),
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputIconsColor}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            )
                          }}
                        />
                        <div style={{ width: "100%", textAlign: "right" }}>
                          <a
                            href="#"
                            style={{
                              color: "orange",
                              textDecoration: "underline",

                              fontWeight: "bold"
                            }}
                          >
                            Forgot Password?
                          </a>
                        </div>
                      </CardBody>
                      <CardFooter
                        className={classes.cardFooter}
                        style={{ flexDirection: "column" }}
                      >
                        <Button
                          color="success"
                          size="lg"
                          style={{ width: "300px" }}
                          type="submit"
                          className={this.state.flippedButton ? classes.buttonHidden : "" }
                          // onClick={(e) => {
                          //   this.handleSubmit(e);
                          // }}
            
                        >
                          Login
                        </Button>
                        {/* <Button simple color="primary" size="lg">
                          Create Account
                        </Button> */}
                      </CardFooter>
                      <CardFooter
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                          marginBottom: -15
                        }}
                      />
                    </form>
                  </Card>
                  <Card key="back" style={{ minHeight: "30vh" }}>
                    <form
                      className={classes.form}
                      onSubmit={this.handleSubmit}
                      style={{ height: "100%" }}
                    >
                      <CardBody
                        style={{ width: "100%", minHeight: "15vh", padding: 0 }}
                      >
                        <div className={wrapperDiv} style={{ marginLeft: "10%"}}>
                          <FormControlLabel
                            control={
                              <Radio
      
                                checked={this.state.selectedEnabled === "1"}
                                onChange={this.handleChangeEnabled}
                                value="1"
                                name="radio button enabled"
                                aria-label="1"
                                icon={
                                  <FiberManualRecord
                                    className={classes.radioUnchecked}
                                  />
                                }
                                checkedIcon={
                                  <FiberManualRecord
                                    className={classes.radioChecked}
                                  />
                                }
                                classes={{
                                  checked: classes.radio,
                               
                                }}
                              />
                            }
                            classes={{
                              label: classes.label,
                              
                            }}
                            label="Big Basin Redwoods State Park"
                          />
                        </div>
                        <div className={wrapperDiv} style={{textAlign:"center"}}>
                          <FormControlLabel
                            control={
                              <Radio
                                checked={this.state.selectedEnabled === "3"}
                                onChange={this.handleChangeEnabled}
                                value="3"
                                name="radio button enabled"
                                aria-label="3"
                                icon={
                                  <FiberManualRecord
                                    className={classes.radioUnchecked}
                                  />
                                }
                                checkedIcon={
                                  <FiberManualRecord
                                    className={classes.radioChecked}
                                  />
                                }
                                classes={{
                                  checked: classes.radio
                                }}
                              />
                            }
                            classes={{
                              label: classes.label
                            }}
                            label="Castle Rock State Park"
                          />
                        </div>
                        <div className={wrapperDiv} style={{textAlign:"center"}}>
                          <FormControlLabel
                            control={
                              <Radio
                                checked={this.state.selectedEnabled === "4"}
                                onChange={this.handleChangeEnabled}
                                value="4"
                                name="radio button enabled"
                                aria-label="4"
                                icon={
                                  <FiberManualRecord
                                    className={classes.radioUnchecked}
                                  />
                                }
                                checkedIcon={
                                  <FiberManualRecord
                                    className={classes.radioChecked}
                                  />
                                }
                                classes={{
                                  checked: classes.radio
                                }}
                              />
                            }
                            classes={{
                              label: classes.label
                            }}
                            label="Henry Cowell Redwoods State Park"
                          />
                        </div>
                        <div className={wrapperDiv} style={{textAlign:"center"}}>
                          <FormControlLabel
                            control={
                              <Radio
                                checked={this.state.selectedEnabled === "5"}
                                onChange={this.handleChangeEnabled}
                                value="5"
                                name="radio button enabled"
                                aria-label="5"
                                icon={
                                  <FiberManualRecord
                                    className={classes.radioUnchecked}
                                  />
                                }
                                checkedIcon={
                                  <FiberManualRecord
                                    className={classes.radioChecked}
                                  />
                                }
                                classes={{
                                  checked: classes.radio
                                }}
                              />
                            }
                            classes={{
                              label: classes.label
                            }}
                            label="The Forest of Nisene Marks State Park"
                          />
                        </div>
                        <div className={wrapperDiv} style={{textAlign:"center"}}>
                          <FormControlLabel
                            control={
                              <Radio
                                checked={this.state.selectedEnabled === "6"}
                                onChange={this.handleChangeEnabled}
                                value="6"
                                name="radio button enabled"
                                aria-label="6"
                                icon={
                                  <FiberManualRecord
                                    className={classes.radioUnchecked}
                                  />
                                }
                                checkedIcon={
                                  <FiberManualRecord
                                    className={classes.radioChecked}
                                  />
                                }
                                classes={{
                                  checked: classes.radio
                                }}
                              />
                            }
                            classes={{
                              label: classes.label
                            }}
                            label="Portola Redwoods State Park"
                          />
                        </div>
                        <div className={wrapperDiv} style={{textAlign:"center"}}>
                          <FormControlLabel
                            control={
                              <Radio
                                checked={this.state.selectedEnabled === "7"}
                                onChange={this.handleChangeEnabled}
                                value="7"
                                name="radio button enabled"
                                aria-label="7"
                                icon={
                                  <FiberManualRecord
                                    className={classes.radioUnchecked}
                                  />
                                }
                                checkedIcon={
                                  <FiberManualRecord
                                    className={classes.radioChecked}
                                  />
                                }
                                classes={{
                                  checked: classes.radio
                                }}
                              />
                            }
                            classes={{
                              label: classes.label
                            }}
                            label="Wilder Ranch State Park"
                          />
                        </div>
                        <div className={wrapperDiv} style={{textAlign:"center", marginBottom: 10}}>
                          <FormControlLabel
                            control={
                              <Radio
                                checked={this.state.selectedEnabled === "0"}
                                onChange={this.handleChangeEnabled}
                                value="0"
                                name="radio button enabled"
                                aria-label="0"
                                icon={
                                  <FiberManualRecord
                                    className={classes.radioUnchecked}
                                  />
                                }
                                checkedIcon={
                                  <FiberManualRecord
                                    className={classes.radioChecked}
                                  />
                                }
                                classes={{
                                  checked: classes.radio
                                }}
                              />
                            }
                            classes={{
                              label: classes.label
                            }}
                            label="All Parks (May affect page load time)"
                          />
                        </div>
                      </CardBody>
                      <CardFooter
                        className={classes.cardFooter}
                        style={{
                          flexDirection: "column",
                          height: "100%",
                          position: "relative",
                          bottom: 0,
                          right: 0
                        }}
                      >
                        <Button
                          className={this.state.isFlipped ? "" : "hide_button"}
                          color="success"
                          size="lg"
                          style={{ width: "300px" }}
                          // type="submit"
                          onClick={(e) => {
                            e.target.value = this.state.selectedEnabled
                            this.handleLogin(e)
                    
                          }}
                        >
                          Let's Go!
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </ReactCardFlip>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <div style={{position: "fixed", bottom: 0, right: 0, color: "white", zIndex: 1000, textAlign:"right"}}>
          Version: 1.1
          <br /> 
          Last Update: 3/7/2019
        </div>
      </div>
    );
  }
}

// CustomInput.propTypes = {
//   labelText: PropTypes.node,
//   labelProps: PropTypes.object,
//   id: PropTypes.string,
//   inputProps: PropTypes.object,
//   formControlProps: PropTypes.object,
//   error: PropTypes.bool,
//   success: PropTypes.bool
// };

export default withStyles(loginPageStyle)(LoginPage);
