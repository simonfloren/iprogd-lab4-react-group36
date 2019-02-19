import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  Paper,
  CardContent,
  Divider,
  TableRow,
  TableCell,
  CircularProgress,
  Button,
  CardMedia
} from "@material-ui/core";
import { Table, TableBody } from "@material-ui/core";

const styles = {
  root: {},
};

class Details extends Component {
  constructor(props) {
    super(props);

    this.model = props.model;
    this.state = {
      error: "",
      status: "LOADING",
      dish: {},
      numberOfGuests: this.model.getNumberOfGuests()
    };
  }

  componentDidMount() {
    this.model.addObserver(this);

    const dishId = this.model.getDetailedDish();

    if (typeof dishId === 'undefined') {
      this.setState({
        error: "Dish was undefined",
        status: 'ERROR'
      });
    } else {
      this.model.getDish(dishId)
        .then(dishDetailed => {
          console.log("returned", dishDetailed);
          this.setState({
            dish: dishDetailed,
            status: 'LOADED',
            error: "",
            numberOfGuests: this.model.getNumberOfGuests()
          });
        })
        .catch(error => {
          this.setState({
            error,
            status: 'ERROR'
          });
        });
    }
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    });
  }

  render() {
    const { status, error, numberOfGuests, dish } = this.state;
    const guests = numberOfGuests;
    const rows = [];

    console.log("Dish", dish);

    switch (status) {
      case 'LOADING':
        return (
          <CircularProgress />
        );

      case 'ERROR':
        return (
          <Typography>{error}</Typography>
        );

      case 'LOADED':
        for (let i = 0; i < dish.extendedIngredients.length; i++) {
          let id = i + 1; // for clarity
          let name = dish.extendedIngredients[i].name;
          let amount = dish.extendedIngredients[i].amount.toFixed(2);
          let unit = dish.extendedIngredients[i].unit;
          rows.push({ id, amount, unit, name });
        }

        // is it better to store data in state, even if we know that it won't change will comp. is mounted?
        return (
          <Grid container spacing={16} direction="row">
            <Grid item xs={12} md={6} container direction="column">
              <Grid item container spacing={8}>
                <Grid item xs={12}>
                  <Typography variant="h4">{dish.title}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <img src={dish.image} />
                </Grid>

                <Grid item xs={12}>
                  <Typography>lorem ipsum</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Link to="/search" style={{textDecoration: 'none'}}>
                    <Button
                      color="primary"
                      variant="contained"
                      >Back to search</Button>
                  </Link>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">Preparation</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography>{dish.instructions}</Typography>
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12} md={6} container style={{ marginTop: '10px' }}>
              <Card style={{ width: '100%' }}>
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
                      <Button variant="contained" onClick={() => {
                        this.model.addDish(dish.id);
                      }}>Add to menu</Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>
                        Price: {(guests * dish.pricePerServing).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        );
    }
  }
}

export default Details;
