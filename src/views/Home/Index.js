import React from 'react';
import MapChart from 'components/MapChart/Index';
import API from '../../providers/API';
import {GET_AIRPORTS} from '../../variables/urls';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import CustomAlert from "components/Snackbar/CustomAlert.js";
import { Card,CardBody, CardTitle} from 'reactstrap';
import Joyride from 'react-joyride';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const steps =  [
    {
      target: '.primero',
      content: 'This is my awesome feature!',
    },
    {
      target: '.segundo',
      content: 'This another awesome feature!',
    },
    {
        target: '.tercero',
        content: 'This another awesome feature!',
    }

  ]
export default class HomeComponent extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = { airports: [] , error: false , loading:false};
    }
    componentDidMount(){
    this.setState({ loading: true })
    API.get(GET_AIRPORTS)
      .then(res => {
          
        this.setState({airports: res.data})
        this.setState({ loading: false })

      })
      .catch(()=> {this.setState({error: true}) })
    }
    
    shouldComponentUpdate(nextProps, nextState) {

        if (this.state.airports !== nextState.airports) {
          return true;
        }
        return false;
      }
    componentWillUnmount(){
        console.log("component will unmount");
        this.setState({ airports: [] });
        this.setState({ loading: true });
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
                        <Joyride steps={steps} />
                        <MapChart  airports={this.state.airports} />

                    </div> 
                    )
            }
            
        }
    }

    render(){
        return ( <div>
            <Card>
            <CardBody>
            <CardTitle tag="h5">AirportData</CardTitle>
            {this.centralComponent()}
            </CardBody>
            </Card>
        </div> );
    }
}
 