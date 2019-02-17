import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, Divider, TableRow, TableCell } from '@material-ui/core';
import { Table, TableBody } from '@material-ui/core';
//import DinnerModel from '../data/DinnerModel'; is this in props?

const styles = {
    root: {}
};

class Printout extends Component {
    constructor(props) {
        super(props);

        let dish = this.props.model.getDish(this.props.id);

        const rows = [];
        for (let i = 0; i < dish.extendedIngredients.length; i++) {
            let id = i+1; // for clarity
            let name = dish.extendedIngredients[i].name;
            let amount = dish.extendedIngredients[i].amount;
            let unit = dish.extendedIngredients[i].unit;
            rows.push( { id, amount, unit, name } );
        }

        this.state = {
            numberOfGuests: this.props.model.getNumberOfGuests(),
            image: dish.image,
            name: dish.title,
            instr: dish.instructions,
            ing: rows,
            price: dish.pricePerServing
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
                    <Card>
                        <CardContent>
                            <Typography>Ingredients for {guests} people</Typography>
                            <Divider variant="middle" />
                                <Table>
                                    <TableBody>
                                        {this.state.rows.map(row => (
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
                            <Grid>
                                <button>Add to menu</button>
                                <Typography>Price: {guests * this.state.price}</Typography>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Typography>{this.state.name}</Typography>
                    <image src={this.state.image}></image>
                    <Typography>lorem ipsum</Typography>
                    <button>Back to search</button>
                    <Typography>Preparation</Typography>
                    <Typography>{this.state.instr}</Typography>
                </Grid>
            </div>
        ); 
    }
}