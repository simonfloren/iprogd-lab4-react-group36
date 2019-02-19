import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Details from '../Details/Details';
import { Grid, Typography } from '@material-ui/core';

class DishDetails extends Component {
  render() {
    return (
      <Grid container direction="row" className='DishDetails'>
        <Grid item xs={2}>
          <Sidebar model={this.props.model} />
        </Grid>
        <Grid item xs={10} container>
          <Details model={this.props.model}/>
        </Grid>
      </Grid>
    );
  }
}

export default DishDetails;
