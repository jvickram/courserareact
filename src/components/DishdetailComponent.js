import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


  function RenderDish({dish}) {
    return(
      <Card dish={dish}>
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
            <div className="dishDetail col-12 col-md-5 m-1">
                <RenderDish dish = {dish} />
            </div>
            <div className="comments col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                <RenderComments comments = {props.dish.comments} />
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