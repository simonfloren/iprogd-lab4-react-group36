import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Divider, Button } from '@material-ui/core';
import SecondHeader from '../SndHeader/SecondHeader';
import DishItem from '../DishItem/DishItem';

const styles = {
  root: {}
};

class MenuOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfGuests: 0,
      menu: [],
    };
  }

  componentDidMount() {
    this.props.model.addObserver(this);
    this.update();
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getMenu()
    });
  }

  render() {
    let guests = this.state.numberOfGuests;
    let menu = this.state.menu;
    return (
      <Grid container direction="column" justify="center">

        <Grid item xs={12}>
          <SecondHeader model={this.props.model} />
        </Grid>

        <Grid item container spacing={8} justify="center">

          {menu.map(dish => (
            <Grid item alignItems="center">
              <DishItem dish={dish} modelInstance={this.props.model} />
              <Typography align="center">{(dish.pricePerServing * guests).toFixed(2)} SEK</Typography>
            </Grid>
          ))}

          <Grid item container direction='row' justify="center">
            <Typography>Total: {this.props.model.getMenuPrice() * guests} SEK</Typography>
          </Grid>


          <Grid item>
            <Divider />
              <Link to="/printout" style={{ textDecoration: 'none' }}>
                <Button
                  color="primary"
                  variant="contained"
                >Print full recipe</Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        );
      }
    }
    
export default MenuOverview;