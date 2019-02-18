import React, { Component } from 'react';
import modelInstance from '../data/DinnerModel';
import { Grid, Typography, TextField, MenuItem } from '@material-ui/core';
import './Dishes.css';

class Dishes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'LOADING',
      types: modelInstance.getDishTypes(),
      selectedType: "All",
    };
  }


  componentDidMount() {
    modelInstance
      .getAllDishes()
      .then(dishes => {
        this.setState({
          status: 'LOADED',
          dishes: dishes.results
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
    const { types, selectedType } = this.state;

    console.log(types);

    switch (this.state.status) {
      case 'LOADING':
        dishesList = <em>Loading...</em>;
        break;
      case 'LOADED':
        dishesList = this.state.dishes.map(dish => (
          <li key={dish.id}>{dish.title}</li>
        ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <Grid container direction="column" className='Dishes'>
        <Grid item className="select-dish-header">
          <Typography variant="h5">Find a dish</Typography>
          <Grid item xs={3}>
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="dish-type-input"
              select
              label="Dish type"
              value={selectedType}
              onChange={() => {}}
              helperText="Choose a dish type"
              margin="normal"
              variant="outlined"
            >
              {types.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <ul>{dishesList}</ul>
      </Grid>
    );
  }
}

export default Dishes;
