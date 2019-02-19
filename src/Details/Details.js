import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  TableRow,
  TableCell,
  CircularProgress
} from "@material-ui/core";
import { Table, TableBody } from "@material-ui/core";

const styles = {
  root: {}
};

class Details extends Component {
  constructor(props) {
    super(props);

    this.model = props.model;
    this.state = {
      error: "",
      isLoading: true,
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
        isLoading: false
      });
    } else {
      this.model.getDish(this.model.getDetailedDish())
        .then(dishDetailed => {
          console.log("returned", dishDetailed);
          this.setState({
            dish: dishDetailed,
            isLoading: false,
            error: "",
            numberOfGuests: this.model.getNumberOfGuests()
          });
        })
        .catch(error => {
          this.setState({
            error,
            isLoading: false
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
    const { isLoading, error, numberOfGuests, dish } = this.state;

    console.log("Dish", dish);

    if (isLoading) {
      return (
        <CircularProgress />
      );
    } else if (error !== "") {
      return (
        <Typography>{error}</Typography>
      );
    } else {
      const guests = numberOfGuests;

      const rows = [];
      for (let i = 0; i < dish.extendedIngredients.length; i++) {
        let id = i + 1; // for clarity
        let name = dish.extendedIngredients[i].name;
        let amount = dish.extendedIngredients[i].amount;
        let unit = dish.extendedIngredients[i].unit;
        rows.push({ id, amount, unit, name });
      }

      // is it better to store data in state, even if we know that it won't change will comp. is mounted?
      return (
        <Grid container>
          <Grid item xs={6}>
            <Grid item container>
              <Typography>{dish.title}</Typography>
            </Grid>
            <Grid container>
              <img src={dish.image} />
            </Grid>
            <Grid container>
              <Typography>lorem ipsum</Typography>
            </Grid>
            <Grid container>
              <Link to="/search">
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
                  <Grid item xs={2}>
                    <Typography>
                      Price: {guests * dish.pricePerServing}
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
