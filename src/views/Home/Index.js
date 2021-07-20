import React, { Component } from 'react';
import MapChart from 'components/MapChart/Index';
import API from '../../providers/API';
import {GET_AIRPORTS} from '../../variables/urls';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import CustomAlert from "components/Snackbar/CustomAlert.js";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  airports : [], loading : true, error: false}
    }
    componentDidMount() {
    API.get(GET_AIRPORTS)
      .then(res => {
        this.setState({ airports:  res.data});
      })
      .catch(this.setState({error:true}))
      .finally(this.setState({loading:false}));
  } 
    centralComponent(){
        if(this.state.airports.length == 0 && this.state.loading){
            return   <ClipLoader color="ffffff" loading="true" css={override} size={150} />
        }
        else{
            if(this.state.error)
            {
                return <><CustomAlert mensaje={'Error - Tuvimos un problema conectandonos con el servidor. Por favor intente más tarde'} close color="danger"/>
                <br /></>
            }
            if(this.state.airports.length > 0)
            {
                return <div><MapChart  airports={this.state.airports}/></div> ;
            }
            
        }
    }
    render() { 
        return ( <div>
            {this.centralComponent()}
        </div> );
    }
}
 
export default HomeComponent;