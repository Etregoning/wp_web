import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Warning from "@material-ui/icons/Warning";
import People from "@material-ui/icons/People";

import ArchivedIssues from "./ArchivedIssues"
// This will need to be uncommented in the future when patrol reports are used.
// import ArchivedPatrols from "./ArchivedPatrols"


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

function ArchivePage(props) {
  console.log("i am table list");

  return (
    <div>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
          // title="Tasks:"
          headerColor="success"
          tabs={[
            {
              tabName: "Issues",
              tabIcon: Warning,
              tabContent: <ArchivedIssues />
            },
            {
              tabName: "Interactions",
              tabIcon: People,
              tabContent: (
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {/* <ArchivedPatrols /> */}
                    <h1 style={{textAlign: 'center'}}>
                      Interaction reports are currently not being used as the app is 
                      focusing on issue reports first. This page is a placeholder for 
                      a later date.
                    </h1>
                  </GridItem>
                </GridContainer>
              )
            }
          ]}
        />
      </GridItem>
      
    </div>
  );
}

export default withStyles(styles)(ArchivePage);
