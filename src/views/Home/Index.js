import React from 'react';
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

export default class HomeComponent extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = { airports: [] , error: false };
    }
    componentDidMount(){
    API.get(GET_AIRPORTS)
      .then(res => {
          
        this.setState({airports: res.data})

      })
      .catch(()=> {this.setState({error: true}) })
        }

    centralComponent  = () =>{
        if(this.state.airports.length == 0){
            return   <ClipLoader color="ffffff" loading="true" css={override} size={150} />
        }
        else{
            if(this.state.error)
            {
                return <><CustomAlert mensaje={'Error - Tuvimos un problema conectandonos con el servidor. Por favor intente más tarde'} close color="danger"/>
                <br /></>
            }
            if(this.state.airports && this.state.airports.length > 0)
            {
                return ( 
                    <div>
                        <MapChart  airports={this.state.airports} />
                    </div> 
                    )
            }
            
        }
    }

    render(){
        return ( <div>
            {this.centralComponent()}
        </div> );
    }
}
 