import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, Divider, TableRow, TableCell } from '@material-ui/core';
import { Table, TableBody } from '@material-ui/core';
//import DinnerModel from '../data/DinnerModel'; is this in props?

const styles = {
    root: {}
};

class Details extends Component {
    constructor(props) {
        super(props);

        //let dish = this.props.model.getDish(this.props.id);

        this.state = {
            numberOfGuests: this.props.model.getNumberOfGuests()/* ,
            image: dish.image,
            name: dish.title,
            instr: dish.instructions,
            ing: rows,
            price: dish.pricePerServing */
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
        // Is it needed to call this?
        this.render();
    }

    render() {
        let guests = this.state.numberOfGuests;

        // Need to make this work with api req. and async.
        let dish = {};

        const rows = [];
        for (let i = 0; i < dish.extendedIngredients.length; i++) {
            let id = i+1; // for clarity
            let name = dish.extendedIngredients[i].name;
            let amount = dish.extendedIngredients[i].amount;
            let unit = dish.extendedIngredients[i].unit;
            rows.push( { id, amount, unit, name } );
        }

        // is it better to store data in state, even if we know that it won't change will comp. is mounted?
        return (
            <div>
                <Grid container>
                    <Grid item xs={6}>
                        <Grid container>
                            <Typography>{dish.title}</Typography>
                        </Grid>
                        <Grid container>
                            <img src={dish.image}></img>
                        </Grid>
                        <Grid container>
                            <Typography>lorem ipsum</Typography>
                        </Grid>
                        <Grid container>
                            <Link to='/search'>
                                <button>Back to search</button>
                            </Link>
                        </Grid>
                        <Grid container>
                            <Typography>Preparation</Typography>
                        </Grid>
                        <Grid container>
                            <Typography>{dish.instructions}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography>Ingredients for {guests} people</Typography>
                                <Divider variant="middle" />
                                    <Table>
                                        <TableBody>
                                            {rows.map(row => (
                                                <TableRow key={row.id}>
                                                    <TableCell component="th" scope="row">
                                                        {row.amount * guests} {row.unit}
                                                    </TableCell>
                                                    <TableCell align="right">{row.name}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                <Divider variant="middle" />
                                <Grid container>
                                    <Grid item xs={10}>
                                        <button>Add to menu</button>
                                    </Grid>
                                    <Grid item xs={2} justify="space-between">
                                        <Typography>Price: {guests * dish.pricePerServing}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        ); 
    }
}

export default Details;