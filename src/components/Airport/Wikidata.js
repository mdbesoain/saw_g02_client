import React from 'react'
import {GET_WIKIDATA} from '../../variables/urls';
import API from '../../providers/API';
import { Row, Col } from 'reactstrap';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import CustomAlert from "components/Snackbar/CustomAlert.js";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class Wikidata extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  loading : true, data : [] , error : false};
    }
    componentDidMount(){
        var url = GET_WIKIDATA +`/${this.props.airport.iata}`;
        API.get(url)
        .then(res => {
            
         
            if( res.data.results.bindings[0] != undefined) {
                this.setState({data:  res.data.results.bindings[0] });
            }
            else{
                this.setState({data: null });
            }
            this.setState({ loading:false});
  
        })
        .catch(()=> {this.setState({error: true}) })
    }
    body = () =>{
        if(this.state.loading){
            return <ClipLoader color="ffffff" loading="true" css={override} size={50} />
        }
        else{
            if(this.state.data != null){
                return (
                    <Row>
                        <Col md="4">
                        <br/>
                        <img src={this.state.data.imagen? this.state.data.imagen.value : require("../../assets/img/default-airport.jpg") } style={{width:'100%'}}/>
                        </Col>
                        <Col md="8">
                        <p><strong >Nombre:</strong> {this.state.data.itemLabel.value}</p>
                        <p><strong>Codigo:</strong> {this.state.data.iata.value}</p>
                        <p><strong>Descripcion:</strong> {this.state.data.itemDescription.value}</p>
                        <p><strong> Ubicacion:</strong> {this.state.data.ciudadLabel.value}, {this.state.data.paisLabel.value}</p>
                        <p> <a href={this.state.data.item.value} target="_blank" rel="noreferrer">Ver más en Wikidata</a></p>
                        </Col>
                    </Row>
                )
            }
            if(this.state.error){
                return <><CustomAlert mensaje={'Error - Tuvimos un problema conectandonos con el servidor. Por favor intente más tarde'} close color="danger"/>
                <br /></>
            }
            else{
                return <><CustomAlert mensaje={'Info - No hay información para este aeropuerto'} close color="info"/>
                <br /></>
            }
        }
    }
 
    
    render() { 
        return ( this.body() );
    }
}

