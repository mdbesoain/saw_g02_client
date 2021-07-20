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
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.10.0";
/*import 'leaflet/dist/leaflet.css'
import '~react-leaflet-markercluster/dist/styles.min.css';*/

require('leaflet/dist/leaflet.css'); // inside .js file
require('react-leaflet-markercluster/dist/styles.min.css'); // inside .js file

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/inicio" component={Admin} />
       <Redirect path="/" to="/inicio"/>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
