import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Button } from '@material-ui/core';

const styles = {
  root: {
    width: '100%',
    backgrundColor: 'green',
  },
  link: {
    textDecoration: 'none',
  }
};

class Welcome extends Component {
  render() {
    return (
      <Grid container justify="center" direction="column" style={styles.root} alignContent="center" alignItems="center">

        <Typography align="center">
          This is the awesome, new, cool, interactive way to plan and order your dinner menu.
        </Typography>

        <Typography align="center">
          Press the button below to begin.
        </Typography>

        <Link to='/search' style={styles.link}>
          <Button
            variant="contained"
            size="large"
            color="primary"
          >Start planning</Button>
        </Link>
      </Grid>
    );
  }
}

export default Welcome;
