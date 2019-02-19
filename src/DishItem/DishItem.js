import React, { Component } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import './DishItem.css';

function DishItem(props) {
  const { dish, modelInstance } = props;

  return (
    <div>
      <Card className="Card">
        <Link to="/details">
          <CardActionArea>
            <CardMedia
              component="img"
              alt="dish image"
              className="DishItem"
              height="150"
              image={dish.image}
              title={dish.title}
              onClick={() => {
                console.log("Pressed dish", dish.id);
                modelInstance.setDetailedDish(dish.id);
              }}
            />

            <CardContent>
              <Typography
                align="center"
                onClick={() => {
                  modelInstance.setDetailedDish(dish.id);
                }}
              >
                {dish.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </div>
  );
}

export default DishItem;