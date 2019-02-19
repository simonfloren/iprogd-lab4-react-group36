import React, { Component } from 'react';
import modelInstance from '../data/DinnerModel';
import DishItem from '../DishItem/DishItem';
import {
  Grid, Typography, TextField, MenuItem, Paper
 } from '@material-ui/core';
import './Dishes.css';

class Dishes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'LOADING',
      types: modelInstance.getDishTypes(),
      selectedType: "all",
      inputKeywords: "",
      dishes: [],
    };
  }

  componentDidMount() {
    this.updateSearch();
  }

  updateSearch() {
    const { selectedType, inputKeywords } = this.state;
    console.log("Search query", selectedType, inputKeywords);
    modelInstance.getAllDishes(selectedType, inputKeywords).then(dishes => {
      this.setState({
        status: 'LOADED',
        dishes: dishes
      });
    })
    .catch(() => {
      this.setState({
        status: 'ERROR'
      });
    });
  }

  render() {
    let dishesList = null;
    const { types, selectedType, dishes, status } = this.state;

    switch (status) {
      case 'LOADING':
        dishesList = <em>Loading...</em>;
        break;
      case 'LOADED':
        dishesList = dishes.map(dish => (
          <Grid item>
            <DishItem dish={dish} modelInstance={modelInstance} />
          </Grid>
        ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <Grid container direction="column" className='Dishes'>
        <Paper>

          <Grid item container spacing={8} className="select-dish-header">
            <Grid item xs={12}>
              <Typography variant="h5">Find a dish</Typography>
            </Grid>

            <Grid item xs={3}>
              <TextField
                id="outlined-search"
                label="Search field"
                type="search"
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  this.setState({ inputKeywords: e.target.value });
                }}
                onKeyDown={(e) => {
                  if(e.keyCode == 13) {
                    this.updateSearch();
                  }
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="dish-type-input"
                select
                label="Dish type"
                value={selectedType}
                onChange={(e) => {
                  this.setState({ selectedType: e.target.value });
                }}
                margin="normal"
                variant="outlined"
                fullWidth
              >
                {types.map(option => (
                  <MenuItem key={option.toLowerCase()} value={option.toLowerCase()}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Paper>

        <Grid item container spacing={16} className="DishList">
          {dishesList}
        </Grid>
      </Grid>
    );
  }
}

export default Dishes;
