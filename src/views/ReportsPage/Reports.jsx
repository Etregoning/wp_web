import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Warning from "@material-ui/icons/Warning";
import People from "@material-ui/icons/People";
import "./styles.css";
import PopulateIssues from "./PopulateIssues";
import PopulatePatrols from "./PopulatePatrols";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

function checkLocalStorage () {
  let park = ""
  if (localStorage.length > 0){
    const name = JSON.stringify(localStorage.park_name)
    park = JSON.parse(name)
  }
  return (park)
}




function TableList(props) {
  console.log("i am table list");
  
  try {
    const name = JSON.stringify(localStorage.park_name)
    const park = JSON.parse(name)
    } catch(e) {
      return false
    }

  return (
    
    <div>
      <GridItem xs={12} sm={12} md={12}>
      <h3 style={{position:"absolute", top:20, left:100}}>Issues from {checkLocalStorage()}</h3>
        <CustomTabs
          // title="Tasks:"
          headerColor="success"
          tabs={[
            {
              tabName: "Issues",
              tabIcon: Warning,
              tabContent: <PopulateIssues />
            },
            {
              tabName: "Interactions",
              tabIcon: People,
              tabContent: 
                "Interaction reports are on hold for the moment to simplify the user experience of the site"
            }
          ]}
        />
      </GridItem>
      
    </div>
  );
}

export default withStyles(styles)(TableList);
