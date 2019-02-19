import React, { Component } from 'react';
import { Typography, Divider, Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class SecondHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfGuests: this.props.model.getNumberOfGuests()
        };
    }

    componentDidMount() {
        this.props.model.addObserver(this);
    }

    componentWillUnmount() {
        this.props.model.removeObserver(this);
    }

    update() {
        // This may be needed when we recalculate the ing. amount and price
        //let dish = this.props.model.getDish(this.props.id);
        this.setState({
            numberOfGuests: this.props.model.getNumberOfGuests()
        });
    }

    render() {
        let guests = this.state.numberOfGuests;
        return (
            <Grid container direction="row" justify="center">
                <Grid item xs={6} container>
                    <Grid item>
                        <Typography variant="h6">My dinner: {guests} people</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6} container justify="flex-end">
                    <Grid item>
                        <Link to="/search" style={{ textDecoration: 'none' }}>
                            <Button
                                color="primary"
                                variant="contained"
                                >Go back and edit dinner</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default SecondHeader;