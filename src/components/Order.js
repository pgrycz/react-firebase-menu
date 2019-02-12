import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../helpers';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

class Order extends Component {
  static propTypes = {
    dishes: PropTypes.object,
    order: PropTypes.object,
    deleteFromOrder: PropTypes.func
  }
  renderOrder = key => {
    const dish = this.props.dishes[key];
    const count = this.props.order[key];
    const isAvailable = dish && dish.status === 'available';
    if (!dish) return null;
    if (!isAvailable) {
      return (
        <CSSTransition classNames="order" key={key} timeout={{enter: 250, exit: 250}}>
          <li key={key}>
            Przykro nam, ale {dish ? dish.name : 'składnik'} jest niedostępny
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition classNames="order" key={key} timeout={{enter: 250, exit: 250}}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition classNames="count" key={count} timeout={{enter: 250, exit: 250}}>
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            szt. {dish.name} {formatPrice(count * dish.price)} <button onClick={() => this.props.deleteFromOrder(key)}>&times;</button>
          </span>
        </li>
      </CSSTransition>
    );
  }
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const dish = this.props.dishes[key];
      const count = this.props.order[key];
      const isAvailable = dish && dish.status === 'available';
      if (isAvailable) {
        return prevTotal + (count * dish.price);
      }
      return prevTotal;
    }, 0); // initialValue = 0, [array].reduce(callback, initialValue);
    return(
      <div className="order-wrap">
      <h2>Zamówienie</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          <span>Całość: </span>
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;