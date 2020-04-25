import { successColor } from "assets/jss/material-dashboard-react.jsx";
import { primaryColor } from "assets/jss/material-dashboard-react.jsx";
const dashboardStyle = {
  successText: {
    color: successColor
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px"
  },
  stats: {
    color: "#999999",
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    }
  },
  cardCategory: {
    color: "#999999",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitle: {
    color: "#3C4858",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontWeight: "400",
      lineHeight: "1"
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
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  radio: {
    color: primaryColor + "!important"
  },
  radioChecked: {
    width: "20px",
    height: "20px",
    border: "1px solid " + primaryColor,
    borderRadius: "50%"
  },
  radioUnchecked: {
    width: "0px",
    height: "0px",
    padding: "10px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "50%"
  },
  label: {
    fontSize: "1vw",
    width: "100%",
    margin: "0 auto"
  }
};

export default dashboardStyle;
