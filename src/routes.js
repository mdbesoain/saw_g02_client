/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import HomeComponent from "views/Home/Index";
import DatosComponent from "views/Datos/Index";

const dashboardRoutes = [
  {
    path: "/",
    name: "Inicio",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: HomeComponent,
    layout: "/inicio",
  },
  {
    path: "/datos",
    name: "Tabla",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DatosComponent,
    layout: "/inicio",
  },
  
];
export default dashboardRoutes;