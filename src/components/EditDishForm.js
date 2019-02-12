import React, {Component} from 'react';
import PropTypes from 'prop-types';

class EditDishForm extends Component {
  static propTypes = {
    dish: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string
    }),
    index: PropTypes.string,
    updateDish: PropTypes.func
  }
  handleChange = (event) => {
    // update that dish: make a copy of current dish
    const updatedDish = {
      ...this.props.dish,
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateDish(this.props.index, updatedDish);
  }
  render() {
    return(
      <div className="fish-edit">
        <input type="text"
               name="name"
               onChange={this.handleChange}
               value={this.props.dish.name}
        />
        <input type="text"
               name="price"
               onChange={this.handleChange}
               value={this.props.dish.price}
        />
        <select type=""
                name="status"
                onChange={this.handleChange}
                value={this.props.dish.status}>
          <option value="available">Dostępne</option>
          <option value="unavailable">Niedostępne</option>
        </select>
        <textarea name="desc"
                  onChange={this.handleChange}
                  value={this.props.dish.desc}
        />
        <input type="text"
               name="image"
               onChange={this.handleChange}
               value={this.props.dish.image}
        />
        <button onClick={() => this.props.deleteDish(this.props.index)}>Usuń składnik</button>
      </div>
    );
  }
}

export default EditDishForm;