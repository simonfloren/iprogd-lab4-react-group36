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

    this.state = {
        dish: {},
        numberOfGuests: this.props.model.getNumberOfGuests()
    };
    
    this.isLoading = true;
    this.error;
    this.props.model
      .getDish(this.props.model.getDetailedDish())
      .then(dishDetailed => {
        console.log(dishDetailed);
        this.isLoading = false;
        this.error = "";
        this.setState({
          dish: dishDetailed,
          numberOfGuests: this.props.model.getNumberOfGuests()
        });
      })
      .catch(error => {
        this.error = error;
        this.isLoading = false;
      });
  }

  componentDidMount() {
    this.props.model.addObserver(this);
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
    if (this.isLoading) {
      return(
        <CircularProgress/>
      );
    } else if (this.error !== "") {
      // TODO: Hanlde error
      // Do we need to render an empty div/grid?
    } else {
      let guests = this.state.numberOfGuests;

      let dish = this.state.dish;

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
        <div>
          <Grid container>
            <Grid item xs={6}>
              <Grid container>
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
                    <Grid item xs={2} justify="space-between">
                      <Typography>
                        Price: {guests * dish.pricePerServing}
                      </Typography>
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
}

export default Details;
