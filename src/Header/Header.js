import React, { Component } from 'react';
import { Paper, Toolbar, Typography, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Header.css';

const styles = {
  header: {
    height: '100px',
    textAlign: 'center',
    backgroundColor: 'orange',
  },
  link: {
    textDecoration: 'none',
  }
};

class Header extends Component {
  render() {
    return (
      <div className='Header'>
        <Link to='/' style={styles.link}>
          <Paper position="static" color="default">
            <Typography variant="h2" align="center" style={styles.header}>Dinner Planner</Typography>
          </Paper>
        </Link>
      </div>
    );
  }
}

export default Header;