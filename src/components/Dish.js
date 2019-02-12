import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../helpers';

class Dish extends Component {
  static propTypes = { // way to use proptypes in statefull component
    details: PropTypes.shape({ /* instead of using PropTypes.object use PropTypes.shape({...})
                                  to precise many object properties */
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  }
  // handleClick = () => {
  //   this.props.addToOrder(this.props.index);
  // }
  render() {
    const {image, name, price, desc, status} = this.props.details; // destructuring feature :-)
    const isAvailable = status === 'available';
    return(
      <li className="menu-fish">
        <img src={image} alt={name}/>
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable}
                // onClick={this.handleClick}>
                // other way to include method
                onClick={() => this.props.addToOrder(this.props.index)}> {/* inline handleClick */}
          {isAvailable ? 'Dodaj do dania' : 'Niedostępne'}
        </button>
      </li>
    );
  }
}

export default Dish;