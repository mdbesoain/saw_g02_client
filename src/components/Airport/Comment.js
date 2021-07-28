import React, { Component } from 'react';
import {
    Card, Button, CardTitle, CardText,
    CardSubtitle, CardBody
  } from 'reactstrap';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <Card>
                <CardBody>
                <CardTitle tag="h5">{this.props.comment.usuario}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{this.props.comment.createAt}</CardSubtitle>
                <CardText>{this.props.comment.comentario}</CardText>
                <Button>Button</Button>
                </CardBody>
            </Card>
          );
    }
}
 
export default Comment;