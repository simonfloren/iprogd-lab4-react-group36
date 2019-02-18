import React, { Component } from 'react';
import { Typography, Divider, Grid } from '@material-ui/core';
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
        let guests = this.state.numberOfGuests();
        return (
            <div>
                <Grid container>
                    <Grid>
                        <Typography>My dinner: {guests} people</Typography>
                    </Grid>
                    <Grid>
                        <Link to='/search'>
                            <button>Go back and edit dinner</button>
                        </Link>
                    </Grid>
                    <Divider/>
                </Grid>
            </div>
        ); 
    }
}

export default SecondHeader;