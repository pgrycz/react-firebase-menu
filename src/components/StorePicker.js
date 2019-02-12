import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {getFunName} from '../helpers'; // import javascript (not react) function

class StorePicker extends Component {
  static propTypes = {
    history: PropTypes.object
  }
  myInput = React.createRef(); // create reference to input
  /** goToStore(event) {... a function instead of a property es6/7 needs to be bound
      in constructor method to have access to this, methods other than built in
      react don't have that access */
  goToStore = event => { // goToStore as a es6/7 property have access to this
    event.preventDefault();
    // get the input value from input reference
    const storeName = this.myInput.current.value;
    // change the page to /store/dynamically-generated
    this.props.history.push(`/store/${storeName}`);
  }
  render() {
    // React.Fragment like div tag wrapper but not rendered after compiling to ES5
    return (
      <Fragment>
        <form className="store-selector"
              onSubmit={this.goToStore}>
          <h2>Lista restauracji</h2>
          <input type="text"
                 ref={this.myInput} // a way to "touch" the DOM as the principle of react is to not touch the DOM
                 required placeholder="nazwa restauracji"
                 defaultValue={getFunName()}
          />
          <button type="submit">Odwiedź restaurację →</button>
        </form>
      </Fragment>
    );
  }
}

export default StorePicker;