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
import Public from "@material-ui/icons/Public";
import TableChart from "@material-ui/icons/TableChart";
import HomeComponent from "views/Home/Index";
import DatosComponent from "views/Datos/Index";
import Entity from "views/Entity";
const dashboardRoutes = [
  {
    path: "/",
    name: "Inicio",
    rtlName: "لوحة القيادة",
    icon: Public,
    component: HomeComponent,
    layout: "/inicio",
    sidebarVisible: true,
    class : "primero"
  },
  {
    path: "/datos",
    name: "Tabla",
    rtlName: "لوحة القيادة",
    icon: TableChart,
    component: DatosComponent,
    layout: "/inicio",
    sidebarVisible: true,
    class : "segundo"
  },
  {
    path: "/entity/:id",
    name: "Entity",
    rtlName: "لوحة القيادة",
    icon: TableChart,
    component: Entity,
    layout: "/inicio",
    sidebarVisible: false
  },
  
];
export default dashboardRoutes;