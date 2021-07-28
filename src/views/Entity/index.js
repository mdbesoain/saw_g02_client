import React, { Component } from 'react';
import API from '../../providers/API';
import {GET_AIRPORTS} from '../../variables/urls';
import CustomTabs from 'components/CustomTabs/CustomTabs';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import CustomAlert from "components/Snackbar/CustomAlert.js";
import { Card,CardBody, CardTitle} from 'reactstrap'
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Entity extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, error:false, airport: {} , aeropuerto : ""}
    }
    componentDidMount(){
        
        if(this.props.match.params.id)
        {
            API.get(GET_AIRPORTS + "/" + this.props.match.params.id)
            .then(res => {
                
            this.setState({airport: res.data})
            this.setState({loading: false});
            this.setState({aeropuerto : res.data.name});
            })
            .catch(()=> {this.setState({error: true}) })
            
        }
        else{
            this.setState({error:true});
        }
        
  
    }
     handleBack = () =>{
        this.props.history.goBack();
     }
     body = () =>{
        if(this.state.loading){
            return   <ClipLoader color="ffffff" loading="true" css={override} size={150} />
        }
        else{
            if(this.state.error)
            {
                return <><CustomAlert mensaje={'Error - Tuvimos un problema conectandonos con el servidor. Por favor intente más tarde'} close color="danger"/>
                <br /></>
            }
            else if(this.state.airport.iata)
            {
                return ( 
                    <div>
                        <CustomTabs  airport={this.state.airport} />
                    </div> 
                    )
            }
            
        }
     }
render() { 
        return ( 
            <Card>
            <CardBody>
            <CardTitle tag="h5">{this.state.aeropuerto}</CardTitle> <br />
                 {this.body()}
            </CardBody>
            </Card>
            //<CustomTabs airport={this.props.airport} />
         );
    }
}

export default Entity;