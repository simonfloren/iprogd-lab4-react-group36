import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';
import { Grid, Typography } from '@material-ui/core';
import './SelectDish.css';

class SelectDish extends Component {
  render() {
    return (
      <Grid container direction="row" className='SelectDish'>
        <Grid item xs={2}>
          <Sidebar model={this.props.model} />
        </Grid>
        <Grid item xs={10} container>
          <Dishes />
        </Grid>
      </Grid>
    );
  }
}

export default SelectDish;
