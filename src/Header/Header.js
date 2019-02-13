import React, { Component } from 'react';
import { Paper, Toolbar, Typography, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Header.css';

const styles = {
  header: {
    textAlign: 'center',
    backgroundColor: 'orange',
  },
  text: {
    padding: '20px',
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
          <Paper position="static" color="default" style={styles.header}>
            <Typography variant="h2" style={styles.text}>Dinner Planner</Typography>
          </Paper>
        </Link>
      </div>
    );
  }
}

export default Header;