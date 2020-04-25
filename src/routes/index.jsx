import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import LoginPage from "views/LoginPage/LoginPage"

const indexRoutes = [
  { 
    path: "/dashboard", 
    component: Dashboard 
  },
  {
    path: "/login",
    component: LoginPage
  }
];

export default indexRoutes;
