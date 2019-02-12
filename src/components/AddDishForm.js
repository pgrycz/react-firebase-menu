import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddDishForm extends Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  static propTypes = {
    addDish: PropTypes.func
  }

  createDish = event => {
    event.preventDefault();
    const dish = {
      /** first .value is react object property and second .value is js
       * standard way to get value */
      name: this.nameRef.value.value,
      price: parseFloat(this.priceRef.value.value), // type number needed
      status: this.statusRef.value.value,
      desc: this.descRef.value.value,
      image: this.imageRef.value.value
    }
    this.props.addDish(dish);
    // reset values in inputs after submitting each dish ingredient
    event.currentTarget.reset();
  }
  render() {
    return(
      <form className="fish-edit" onSubmit={this.createDish}>
        <input type="text"
               ref={this.nameRef}
               name="name"
               placeholder="Nazwa"
        />
        <input type="text"
               ref={this.priceRef}
               name="price"
               placeholder="Cena"
        />
        <select type="text"
                ref={this.statusRef}
                name="status"
                placeholder="Status"
        >
          <option value="available">jest</option>
          <option value="unavailable">nie ma</option>
        </select>
        <textarea type="text"
                  ref={this.descRef}
                  name="desc"
                  placeholder="Opis">
        </textarea>
        <input type="text"
               ref={this.imageRef}
               name="image"
               placeholder="Obrazek"
        />
        <button type="submit">+ Dodaj składnik</button>
      </form>
    );
  }
}

export default AddDishForm;