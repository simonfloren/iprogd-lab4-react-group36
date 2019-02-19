import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';
import { Grid, Typography } from '@material-ui/core';
import './SelectDish.css';

class SelectDish extends Component {
  render() {
    return (
      <Grid container direction="row" spacing={8} className='SelectDish'>
        <Grid item xs={12} md={3}>
          <Sidebar model={this.props.model} />
        </Grid>
        <Grid item xs={12} md={9} container>
          <Dishes />
        </Grid>
      </Grid>
    );
  }
}

export default SelectDish;
