import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import menu from '../sample-fishes';
import Dish from './Dish';
import base from '../base';

class App extends Component {
  state = {
    dishes: {},
    order: {}
  }
  static propTypes = {
    match: PropTypes.object
  }
  loadMenu = () => {
    this.setState({
      dishes: menu
    });
  }
  addDish = dish => {
    // copy of state
    const dishes = {...this.state.dishes};
    // making any operations on state object outside of the state on its copy
    dishes[`dish${Date.now()}`] = dish;
    // update the original state
    this.setState({
      // dishes: dishes    left is a state property, right is a const 'dishes'
      dishes // using es6 if property and value are under same name use name as one word
    });
  }
  updatedDish = (key, updatedDish) => {
    // copy of current state
    const dishes = {...this.state.dishes};
    // update state
    dishes[key] = updatedDish;
    // set state
    this.setState({dishes}); // this.setState({dishes: dishes})
  }
  deleteDish = key => {
    // copy of state
    const dishes = {...this.state.dishes};
    // make a dish at certain key a null value = deleted
    dishes[key] = null; // it's mirrored to firebase, that's why null is used
    // update state
    this.setState({dishes});
  }
  addToOrder = key => {
    // create copy of the state object
    const order = {...this.state.order};
    // add to the order or update the number in order
    order[key] = order[key] + 1 || 1;
    // update state
    this.setState({order});
  }
  deleteFromOrder = key => {
    const order = {...this.state.order};
    // 'delete' is used on object to delete its property or item from that property using key value,
    // it's a javascript method, MDN
    delete order[key];
    this.setState({order});
  }
  componentDidMount() {
    // we need a generic name of the store which is dynamically generated at the beginning
    // App component in React dev tools gives us the prop called match -> params -> storeId
    const {storeId} = this.props.match.params;
    const localStorageRef = localStorage.getItem(storeId);
    if(localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef) /* JSON.parse() is opposite to JSON.stringify() and
        turns ' "{json object}" ' into '{json object}' */
      });
    }
    this.ref = base.syncState(`${storeId}/dishes`, { // rebase, syncs database from firebase back to state
      context: this,
      state: 'dishes'
    });
  }
  componentDidUpdate() {
    const {storeId} = this.props.match.params;
    localStorage.setItem( // setItem(key, value), in devtools in 'Application' tab: key, value to see
      storeId, // key
      JSON.stringify(this.state.order) /* value stringified as its JSON object initially
      and when used by default .toString() it returns [object Object] and that's why it
      needs to be wrapped in built-in JSON.stringify() method to return desired JSON string,
      turns ' {json object} ' into ' "{json object}" ' */
    );
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  render() {
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Świeże jedzenie" />
          <ul className="fishes">
           {/* nested objects when wrapped in Object.keys() are listed as array
               properties with each key index automatically attached under prop key={key},
               but needs additional prop e.g named index={key} for accessing each key to
               use in other components */}
            {Object.keys(this.state.dishes).map( key =>
              <Dish
                key={key} // auto generated key which is enabled via key={key} auto prop
                index={key} // additionally used prop for making key value accessible
                details={this.state.dishes[key]}
                addToOrder={this.addToOrder}
              />
            )}
          </ul>
        </div>
        {/* if You're sure You want to pass whole state with all its properties use this
            spread operator method:
        <Order {...this.state} /> */}
        <Order dishes={this.state.dishes}
               order={this.state.order}
               deleteFromOrder={this.deleteFromOrder}
        />
        <Inventory
          addDish={this.addDish}
          deleteDish={this.deleteDish}
          updatedDish={this.updatedDish}
          loadMenu={this.loadMenu}
          dishes={this.state.dishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;