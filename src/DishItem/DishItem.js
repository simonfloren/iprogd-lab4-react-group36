import React, { Component } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import './DishItem.css';

class DishItem extends Component {
  render() {
    const { dish } = this.props;

    console.log("Rendering dish item", dish);

    return (
      <div>
        <Card className="Card">
          <CardActionArea>
            <CardMedia
              component="img"
              alt="dish image"
              className="DishItem"
              height="150"
              image={dish.image}
              title={dish.title}
            />

            <CardContent>
              <Typography
                align="center">
                {dish.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

export default DishItem;