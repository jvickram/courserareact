import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class MenuComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
           selectedDish: null
        };
        console.log("Menu component Constructor is invoked");
    }

    componentDidMount(){
        console.log("Menu Component componentDidMount is invoked.");
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish});
    }
    renderDish(dish) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

  render() {
    const menu = this.props.dishes.map((dish) => {
        return (
            <Card key={dish.id}
              onClick={() => this.onDishSelect(dish)}>
              <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardImgOverlay>
                  <CardTitle>{dish.name}</CardTitle>
              </CardImgOverlay>
            </Card>
          );
    });
    
  console.log("Menu Component Render is invoked.");
    
    return (
        <div className="container">
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        {menu}
                    </div>
                </div>
                <div className="row">
                  <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.state.selectedDish)}
                  </div>
                </div>
            </div>
    )
  }

}

export default MenuComponent;