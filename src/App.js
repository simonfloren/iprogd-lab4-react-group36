import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import modelInstance from './data/DinnerModel';
import SelectDish from './SelectDish/SelectDish';
import Header from './Header/Header';
import './App.css';
import DishItem from './DishItem/DishItem';
import Printout from './Printout/Printout';
import Details from './Details/Details';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Dinner Planner'
    };
  }

  render() {
    return (
      <div className="App">
        <Header />
        <header className="App-header">
          {/* We rended diffrent component based on the path */}
          <Route exact path='/' component={Welcome} />
          <Route
            path='/search'
            render={() => <SelectDish model={modelInstance} />}
          />
          <Route
            path='/printout'
            render={() => <Printout model={modelInstance} />}
          />
          <Route
            path='/details'
            render={() => <DishDetails model={modelInstance} />}
          />
        </header>
      </div>
    );
  }
}

export default App;
