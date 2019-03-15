import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader,
  Row, Col, Label  } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component{
    constructor(props){
      super(props);
      this.state={
        isModalOpen: false,
      }
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
      console.log('Current State is: ' + JSON.stringify(values));
      alert('Current State is: ' + JSON.stringify(values));
  }   

  toggleModal(){
    this.setState({
        isModalOpen: !this.state.isModalOpen
    })
}

    render(){
      return(
        <div className="col-12 col-md-9">
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-lg"> </span> 
             Comment
          </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                  <Col md={12}>
                    <Label htmlFor="rating">Rating</Label>
                      <Control.select model=".rating" name="rating"
                        className="form-control">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                      </Control.select>
                  </Col>
              </Row>
              <Row className="form-group">
                <Col md={12}>
                  <Label htmlFor="yourname">Your Name</Label>
                  <Control.text model=".yourname" id="yourname" name="yourname"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                      }}
                   />
                  <Errors
                    className="text-danger"
                    model=".yourname"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                      }}
                    />
                  </Col>
              </Row>
              <Row className="form-group">
                <Col md={12}>
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea model=".comment" id="comment" name="comment"
                    rows="12"
                    className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                  <Col md={12}>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </Col>
              </Row>          
              </LocalForm>      
            </ModalBody>
          </Modal>
        </div>    
      );
    }
  }

  function RenderDish({dish}) {
    return(
      <Card key={dish.id}>
        <CardImg src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  function RenderComments({comments}) {
    const renderedComments = comments.map((comment) =>
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit'}).format(new Date(comment.date))}</p>
        </li>
    );

    if (comments != null) {
      return renderedComments;
    } else {
      return(
        <div></div>
      );
    }
  }

  const DishDetail = (props) => {
    console.log("Dishdetail Component Render is invoked");
    const { dish } = props;
    
    if (dish != null) {
      return(
          <div className="container">
            <div className="row">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
            </div>
            <div className="dishDetail col-12 col-md-5 m-1">
                <RenderDish dish = {dish} />
            </div>
            <div className="comments col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                <RenderComments comments = {props.comments} />
                <CommentForm/>
                </ul>
            </div>
            </div>
        </div>
      );
    } else {
      return(
        <div></div>
      );
    }
  }


export default DishDetail;