import React, { Component } from 'react';
import PropTypes, { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import './DishItem.css';

class DishItem extends Component {
  render() {
    const { props, dish } = this.props;

    return (
      <div>
        <Card className="Card">
          <CardActionArea>
            <CardMedia
              component="img"
              alt="dish image"
              className="DishItem"
              height="300"
              image="https://png.pngtree.com/element_origin_min_pic/16/09/16/1557db9c33ec956.jpg"
              title="Dish image"
            />

            <CardContent>
              <Typography>
                "Dish name"
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

export default DishItem;