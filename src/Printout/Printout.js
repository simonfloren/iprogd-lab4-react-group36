import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const styles = {
    root: {}
};

class Printout extends Component {
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
        let menu = this.state.getFullMenu();
        return (
            <div>
                <Grid container>
                    {menu.forEach(dish => (
                        <Grid direction="row">
                            <Grid>
                                <image src={dish.image}></image>
                            </Grid>
                            <Grid>
                                <Typography>{dish.title}</Typography>
                                <Typography>Lorem impsum</Typography>
                            </Grid>
                            <Grid>
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