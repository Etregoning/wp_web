// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import LoginPage from "views/LoginPage/LoginPage"
import ReportsPage from "views/ReportsPage/Reports.jsx";
import SelectPark from "views/LoginPage/SelectPark.jsx"
import Volunteers from "views/VolunteersPage/Volunteers.jsx";
import Maps from "views/Maps/Maps.jsx";
import ArchivePage from "views/ArchivePage/Archive.jsx";


const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  // {
  //   path: "/user",
  //   sidebarName: "Profile",
  //   navbarName: "Profile",
  //   icon: Person,
  //   component: UserProfile
  // },
  {
    path: "/reports",
    sidebarName: "Reports",
    navbarName: "Reports",
    icon: "content_paste",
    component: ReportsPage
  },
  // {
  //   path: "/typography",
  //   sidebarName: "Patrol Reports",
  //   navbarName: "Patrol Reports",
  //   icon: "content_paste",
  //   component: Typography
  // },
  {
    path: "/volunteers",
    sidebarName: "Manage Volunteers",
    navbarName: "Manage Volunteers",
    icon: BubbleChart,
    component: Volunteers
  },
  {
    path: "/maps",
    sidebarName: "Map View",
    navbarName: "Map View",
    icon: LocationOn,
    component: Maps,
    linkDisabled: true
  },
  {
    path: "/archive",
    sidebarName: "Archive",
    navbarName: "Archive",
    icon: Notifications,
    component: ArchivePage
  },
  {
    path: "/login",
    icon: Person,
    invisible: true,
    component: LoginPage
  },
  {
    path: "/select_park",
    icon: LocationOn,
    invisible: true,
    component: SelectPark
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" },
  // { redirect: true, path: "/", to: "/login", navbarName: "Redirect" },
];

export default dashboardRoutes;
