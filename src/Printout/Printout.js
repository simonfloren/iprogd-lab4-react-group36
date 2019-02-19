import React, { Component } from 'react';
import { Typography, Grid } from '@material-ui/core';
import SecondHeader from '../SndHeader/SecondHeader';

const styles = {
    root: {}
};

class Printout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfGuests: this.props.model.getNumberOfGuests(),
            menu: this.props.model.getMenu()
        };
    }

    componentDidMount() {
        this.props.model.addObserver(this);
        this.update();
    }

    componentWillUnmount() {
        this.props.model.removeObserver(this);
    }

    update() {
        // This may be needed when we recalculate the ing. amount and price
        //let dish = this.props.model.getDish(this.props.id);
        this.setState({
            numberOfGuests: this.props.model.getNumberOfGuests(),
            menu: this.props.model.getMenu()
        });
    }

    render() {
        let guests = this.state.numberOfGuests;
        let menu = this.state.menu;
        return (
            <div>
                <Grid container>
                    <SecondHeader model={this.props.model}/>
                </Grid>
                <Grid container direction="column">
                    {menu.map(dish => (
                        <Grid container spacing={24}>
                            <Grid item xs>
                                <img src={dish.image}></img>
                            </Grid>
                            <Grid item xs>
                                <Typography>{dish.title}</Typography>
                                <Typography>Lorem impsum</Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography>Preparation</Typography>
                                <Typography>{dish.instructions}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

export default Printout;