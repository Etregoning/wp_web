import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import PopulateUsers from "views/VolunteersPage/PopulateUsers"
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import People from "@material-ui/icons/People";
import iconsStyle from "assets/jss/material-dashboard-react/views/iconsStyle.jsx";

function Volunteers(props) {
  const { classes } = props;
  return (
    <div>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
          // title="Tasks:"
          headerColor="success"
          tabs={[
            {
              tabName: "Volunteers",
              tabIcon: People,
              tabContent: <PopulateUsers />
            },
           
          ]}
        />
        {/* <PopulateUsers /> */}
      </GridItem>
      
    </div>
  );
}



export default Volunteers
