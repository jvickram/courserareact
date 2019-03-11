import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle } from 'reactstrap';
import DishdetailComponent from "./DishdetailComponent";


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
                <DishdetailComponent dish={dish}/>
            );
        else
            return(
                <div></div>
            );
    }

  render() {
    const menu = this.props.dishes.map((dish) => {
        return (
            <div  className="col-12 col-md-5 m-1" key={dish.id}>
            <Card 
              onClick={() => this.onDishSelect(dish)}>
              <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardImgOverlay>
                  <CardTitle>{dish.name}</CardTitle>
              </CardImgOverlay>
            </Card>
            </div>
          );
    });
    
  console.log("Menu Component Render is invoked.");
    
    return (
        <div className="container">
                <div className="row">
                    {menu}
                </div>
                {this.renderDish(this.state.selectedDish)}
        </div>
    )
  }

}

export default MenuComponent;