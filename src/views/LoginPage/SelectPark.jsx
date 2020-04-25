import React from "react";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom'
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
// API
import { userLogin } from "api/AuthAPI"

class SelectPark extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      email: "",
      password: "",
      loginFailed: false,
      toDashboard: false,
      cardAnimaton: "cardHidden",
      checked: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  // componentWillMount() {
  //   <Route path={prop.path} component={prop.component} key={key} />
  // }



  handleSubmit(event) {
    const email = this.state.email
    const password = this.state.password
    console.log("email:" + this.state.email + "password:" + this.state.password);
    this.userLogin(email, password)
    event.preventDefault();
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
    if (this.state.loginFailed === true){
      alert("Invalid login credentials")
    }
    if (this.state.toDashboard === true) {
      return < Redirect to='dashboard' />
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
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form} onSubmit={this.handleSubmit}>
                 

                    <CardBody style={{ marginBottom: 50 }}>
                    <div class="radio">
                      <label>
                        <input type="radio" name="optionsRadios" />
                        Radio is off
                      </label>
                    </div>
                    <div class="radio">
                      <label>
                        <input type="radio" name="optionsRadios" checked="true" />
                        Radio is on
                      </label>
                    </div>
                    <div class="radio">
                      <label>
                        <input type="radio" name="optionsRadiosDisabled" disabled />
                        Disabled Radio is off
                      </label>
                    </div>
                    <div class="radio">
                      <label>
                        <input type="radio" name="optionsRadiosDisabled" checked="true" disabled />
                        Disabled Radio is on
                      </label>
                    </div>
                    </CardBody>

                    <CardFooter
                      className={classes.cardFooter}
                      style={{ flexDirection: "column" }}
                    >
                      <Button
                        color="success"
                        size="lg"
                        style={{ width: "300px", transition: "opacity 2s ease-in" }}
                        type="submit"
                        onClick={() => {
                          this.handleSubmit;
                        }}
                      >
                        Let's Go!
                      </Button>
                   
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
              </GridItem>
            </GridContainer>
          </div>
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

export default withStyles(loginPageStyle)(SelectPark);
