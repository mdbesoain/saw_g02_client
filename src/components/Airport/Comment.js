import React, { Component } from 'react';
import {
    Card, Button, CardTitle, CardText,
    CardSubtitle, CardBody, Row, Col,FormGroup, Label, Input
  } from 'reactstrap';
import {GET_COMMENTS} from '../../variables/urls';
import API from '../../providers/API';
import Usuario from "../../assets/img/user.png"
import Moment from 'react-moment';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {  editing : false,  usuario : "", comentario: "" , createdAt : ""}
        this.createComent = this.createComent.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleEditComment = this.handleEditComment.bind(this);

      
    }
    componentDidMount(){

        this.setinicialStatus();
    }

    setinicialStatus (){
        this.setState({editing : this.props.editing});
        this.setState({usuario : this.props.comment.usuario})
        this.setState({comentario : this.props.comment.comentario})
        this.setState({createdAt : this.props.comment.createAt})
    }
    reloadpage () {
        window.location.reload(false);
    }
    createComent(){
        
        if(this.state.editing){
            let url = GET_COMMENTS + "/" + this.props.comment.id
            let json = {
                comentario : this.state.comentario
            }
            API.put(url, json)
            .then(res => {
            
            this.setState({data:  res.data});
            this.setState({ loading:false});
            
            })
            .catch(()=> {this.setState({error: true}) })
            .finally(this.reloadpage())
        }
        else{
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
            .finally(this.reloadpage())
        }
        
        
    }

     handleUserChange = (e) =>{
         this.setState({usuario : e.target.value})
     }
     handleCommentChange = (e) =>{
        this.setState({comentario : e.target.value})
    }

     handleDeleteComment(){

        let url = GET_COMMENTS + "/" + this.props.comment.id
        this.setState({ loading:true});
        API.delete(url)
        .then(res => {
            
            this.setState({data:  res.data});
            this.setState({ loading:false});

            
        })
        .catch(()=> {this.setState({error: true}) })
        .finally(this.reloadpage())
     }

     handleEditComment () {
         this.setState({editing : true});
     }
    body = () => {
        if(this.state.editing){
            return (<>
                                
                <Col md="12">
                    <CardTitle tag="h6">Nuevo comentario</CardTitle>
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
                    <CardTitle tag="h6">
                        <Row>
                            <Col md="10">
                            {this.state.usuario}
                            </Col>
                            <Col md="2">
                            <DeleteIcon  onClick={this.handleDeleteComment}/>
                            <CreateIcon  onClick={this.handleEditComment}/>
                            </Col>
                        </Row>
                        
                    
                    </CardTitle>
                    <CardSubtitle tag="small" className="mb-2 text-muted"><Moment format=" hh:mm DD/MM/YYYY">{this.state.createAt}</Moment></CardSubtitle>
                    <CardText>{this.state.comentario}</CardText>                  
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