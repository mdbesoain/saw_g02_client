import React, { Component } from 'react';
import {
    Card, Button, CardTitle, CardText,
    CardSubtitle, CardBody, Row, Col,FormGroup, Label, Input
  } from 'reactstrap';
import {GET_COMMENTS} from '../../variables/urls';
import API from '../../providers/API';
import Usuario from "../../assets/img/user.png"
import Moment from 'react-moment';
class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {  editing : false,  usuario : "", comentario: "" }
        this.createComent = this.createComent.bind(this);
        
    }
    componentDidMount(){

        this.setState({editing : this.props.editing});
    }

    createComent(){
        let json = {
            aeropuerto : this.props.airport.iata,
            comentario : this.state.comentario,
            usuario : this.state.usuario
        }
        API.post(GET_COMMENTS, json)
        .then(res => {
            
            this.setState({data:  res.data});
            this.setState({ loading:false});
            this.props.callBack("Called from child");
        })
        .catch(()=> {this.setState({error: true}) })
        
    }

     handleUserChange = (e) =>{
         this.setState({usuario : e.target.value})
     }
     handleCommentChange = (e) =>{
        this.setState({comentario : e.target.value})
    }
    body = () => {
        if(this.props.editing){
            return (<>
                                
                <Col md="12">
                    <CardTitle tag="h5">Nuevo comentario</CardTitle>
                    <FormGroup>
                        <Label for="exampleText">Usuario</Label>
                        <Input type="text" name="user" id="user" value={this.state.usuario} onChange={this.handleUserChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Comentario</Label>
                        <Input type="textarea" name="comment" id="comment"  value={this.state.comentario} onChange={this.handleCommentChange}/>
                    </FormGroup>
                    <br/>
                    <Button onClick={this.createComent}>Enviar</Button>
                </Col>
             </>)
        }
        else{
            return(<>
                <Col md="1">
                <img src={Usuario}  style={{width:"100%"}}/>
                </Col>
                <Col md="11">
                    <CardTitle tag="h6">{this.props.comment.usuario}</CardTitle>
                    <CardSubtitle tag="small" className="mb-2 text-muted"><Moment format=" hh:mm DD/MM/YYYY">{this.props.comment.createAt}</Moment></CardSubtitle>
                    <CardText>{this.props.comment.comentario}</CardText>                  
                </Col>
            </>
            )
        }
    }
    render() { 
        return (
            <Card>
                <CardBody>
                    <Row>
                        {this.body()}
                    </Row>
                </CardBody>
            </Card>
          );
    }
}
 
export default Comment;