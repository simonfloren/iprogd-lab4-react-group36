import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { Typography, Grid, TextField, Divider, Paper, Button } from '@material-ui/core';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.model = this.props.model;

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.model.getNumberOfGuests(),
      menu: [],
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.model.addObserver(this);
    this.update();
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.model.getNumberOfGuests(),
      menu: this.model.getMenu()
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.model.setNumberOfGuests(e.target.value);
  };

  render() {
    const { numberOfGuests, menu } = this.state;
    const totalPrice = this.model.getMenuPrice() * numberOfGuests;

    return (
      <Paper className="Sidebar">
        <Grid container>

          {/* Sidebar header */}
          <Grid item container spacing={8}>
            <Grid item xs={12}>
              <Typography variant="h5">My Dinner</Typography>
            </Grid>

            <Grid item container alignItems="center">
              <Grid item xs={4}>
                <Typography>People: </Typography>
              </Grid>

              <Grid item xs={8}>
                <TextField
                  id="standard-number"
                  value={numberOfGuests}
                  onChange={this.onNumberOfGuestsChanged}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item container spacing={8}>
              {menu.map((dish) => {
                return (
                  <Grid item xs={12} key={dish.id}>
                    <Paper onClick={() => {
                      this.model.removeDish(dish.id);
                    }}>
                      <div className="SidebarItem">
                        <Grid container direction="row" justify="space-between">
                          <Grid item xs={10}>
                            <Typography>{dish.title}</Typography>
                          </Grid>
                          <Grid item xs={2} container direction="row" justify="flex-end">
                            <Typography align="left">{(dish.pricePerServing * numberOfGuests).toFixed(2)}</Typography>
                            <Typography align="left">&nbsp;SEK</Typography>
                          </Grid>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>

            <Grid item container justify="flex-end">
              <Grid item>
                <Typography>{totalPrice}</Typography>
              </Grid>
              <Grid item>
                <Typography>&nbsp; SEK</Typography>
              </Grid>
            </Grid>

            <Grid item container justify="center">
              <Link to="/menuoverview" style={{ textDecoration: 'none' }}>
                <Button
                  color="primary"
                  variant="contained"
                >Confirm dinner</Button>
              </Link>
            </Grid>

          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default Sidebar;
