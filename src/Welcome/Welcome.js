import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';

const styles = {
  root: {
    align: 'center',
    heigth: '100%',
    backgrundColor: 'green',
  }
};
class Welcome extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Grid container justify='center' alignItems='center' direction='column'>
          <Typography>
            This is the awesome, new, cool, interactive way to plan and order your dinner menu.
          </Typography>

          <Typography>
            Press the button below to begin.
          </Typography>

          <Link to='/search'>
            <button>Start planning</button>
          </Link>
        </Grid>

      </div >
    );
  }
}

export default Welcome;
