import React, { Component } from 'react';
import AddAlert from "@material-ui/icons/AddAlert";
import SnackbarContent from "./SnackbarContent.js";
class CustomAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 

     <SnackbarContent
          message={this.props.mensaje}
          close
          icon={AddAlert}
          color={this.props.color}
     />
         );
    }
}
 
export default CustomAlert;