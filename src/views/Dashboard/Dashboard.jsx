import React from "react";
import PropTypes from "prop-types";
import classNames from 'classnames'
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart
// } from "variables/charts";
// @material-ui/core
import ReactFitText from "react-fittext"
import withStyles from "@material-ui/core/styles/withStyles";
import AddAlert from "@material-ui/icons/AddAlert";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
class Dashboard extends React.Component {
  // state = {
  //   value: 0,
  //   parkName: "",
  //   selectedEnabled: "",
  // };
  constructor(props){
    super(props)
    this.state = {
    value: 0,
    parkName: "",
    selectedEnabled: ""
    }
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
    this.handleParkChange = this.handleParkChange.bind(this)
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  
  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }
  // componentDidMount(){
    
  //   console.log(JSON.parse(localStorage.park_name))
  // }
  handleParkChange(e) {
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
  render() {
    const { classes } = this.props;
    const name = JSON.stringify(localStorage.park_name)
    const park = JSON.parse(name)
    const wrapperDiv = classNames(
      classes.checkboxAndRadio,
      classes.checkboxAndRadioHorizontal
    );
    return (
      <div style={{ width: "100%", flex: 1, flexDirection: "column"}}>
   

          <div style={{ width: "90%", height: "20%", margin: "0 auto"}}>
        <h1 style={{textAlign:"center", fontSize: "2.5vw"}}>You are currently viewing the dashboard for {park}.</h1>
        <h2 style={{textAlign:"center", fontSize: "2vw"}}> Use the menu to your left to navigate through the site.</h2>
        <h3 style={{textAlign:"center", marginBottom: "5vh", fontSize: "1.5vw"}}>
          If you would like to change parks, you can do so below.
        </h3>
        </div>
     
  
        <form
                      className={classes.form}
                      onSubmit={this.handleSubmit}
                      style={{ height: "100%" }}
                    >
                      <CardBody
                        style={{ width: "23vw", minHeight: "15vh", padding: 0, margin: "0 auto" }}
                      >
                      
                        <div className={wrapperDiv} style={{textAlign: "left"}}>
                 
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
                        
                        <div className={wrapperDiv} style={{textAlign:"left"}}>
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
                        <div className={wrapperDiv} style={{textAlign:"left"}}>
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
                        <div className={wrapperDiv} style={{textAlign:"left"}}>
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
                        <div className={wrapperDiv} style={{textAlign:"left"}}>
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
                        <div className={wrapperDiv} style={{textAlign:"left"}}>
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
                        <div className={wrapperDiv} style={{textAlign:"left", marginBottom: 10}}>
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
                          right: 20
                        }}
                      >
                        <Button
                          className={this.state.isFlipped ? "" : "hide_button"}
                          color="success"
                          size="lg"
                          style={{ width: "15vw" }}
                          // type="submit"
                          onClick={(e) => {
                            e.target.value = this.state.selectedEnabled
                            this.handleParkChange(e)
                            console.log(e.target.value)
                          }}
                        >
                          Change Park
                        </Button>
                      </CardFooter>
                    </form>
       

      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
