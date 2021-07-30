import React, { Component } from 'react';
import {GET_COMMENTS} from '../../variables/urls';
import API from '../../providers/API';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import CustomAlert from "components/Snackbar/CustomAlert.js";
import Comment from './Comment';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {  loading : true, data : [] , error : false};
        this.getComments = this.getComments.bind(this);
    }

    componentDidMount(){
       this.getComments();
    }
    getComments(val){
        var url = GET_COMMENTS +`/${this.props.airport.iata}`;
        console.log(val);
        this.setState({ loading:true});
        API.get(url)
        .then(res => {
            
            this.setState({data:  res.data});
            this.setState({ loading:false});
  
        })
        .catch(()=> {this.setState({error: true}) })
    }
    

    body = () =>{
        if(this.state.loading){
            return <ClipLoader color="ffffff" loading="true" css={override} size={50} />
        }
        else{
           
            if(this.state.data.length > 0){
                return (
                    <>
                    {
                        this.state.data.map( (comment,key) =>{
                            return <Comment comment={comment} key={key} editing={false}/>
                        })
                    }
                    <br/>
                    <Comment airport={this.props.airport} editing="true" callBack={this.getComments}/>
                    </>
                )
            }
            
            if(this.state.error){
            return <><CustomAlert mensaje={'Error - Tuvimos un problema conectandonos con el servidor. Por favor intente más tarde'} close color="danger"/>
            <br /></>
            }
            else{
                return (                
                    <>
                        <CustomAlert mensaje={'Info - No hay comentarios para este aeropuerto'} close color="info"/>
                        <br />
                        <Comment airport={this.props.airport} editing="true" callBack={this.getComments}/>
                    </>
                )
            }
            
        }
    }

    render() { 
        return ( this.body() );
    }
}
 
export default Comments;