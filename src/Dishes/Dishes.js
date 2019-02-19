import React, { Component } from 'react';
import modelInstance from '../data/DinnerModel';
import DishItem from '../DishItem/DishItem';
import { Grid, Typography, TextField, MenuItem, Paper, Divider } from '@material-ui/core';
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
    console.log("Updaitng piss");
    const { selectedType, inputKeywords } = this.state;
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

  handleKeywordChange(e) {
    this.setState({ inputKeywords: e.target.value});
    this.updateSearch();
  }
  


  render() {
    let dishesList = null;
    const { types, selectedType, dishes, status } = this.state;

    console.log(dishes);

    switch (status) {
      case 'LOADING':
        dishesList = <em>Loading...</em>;
        break;
      case 'LOADED':
        dishesList = dishes.map(dish => (
          <Grid item>
            <DishItem dish={dish} />
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
                onKeyDown={(e) => {
                  if(e.keyCode == 13) {
                    this.handleKeywordChange(e);
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
