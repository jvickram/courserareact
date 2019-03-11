import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle } from 'reactstrap';
// import Dishdetail from "./DishdetailComponent";


class Menu extends Component {
    constructor(props){
        super(props);
        
        console.log("Menu component Constructor is invoked");
    }

    componentDidMount(){
        console.log("Menu Component componentDidMount is invoked.");
    }

  render() {
    const menu = this.props.dishes.map((dish) => {
        return (
            <div  className="col-12 col-md-5 m-1" key={dish.id}>
            <Card 
              onClick={() => this.props.onClick(dish.id)}>
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
        </div>
    )
  }

}

export default Menu;