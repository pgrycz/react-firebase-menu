import React, {Component} from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddDishForm from './AddDishForm';
import EditDishForm from './EditDishForm';
import Login from './Login';
import base, {firebaseApp} from '../base';

class Inventory extends Component {
  static propTypes = {
    dishes: PropTypes.object,
    updatedDish: PropTypes.func,
    deleteDish: PropTypes.func,
    addDish: PropTypes.func
  }
  state = {
    uid: null, // 'uid' = 'user Id'
    owner: null
  }
  authHandler = async (authData) => {
    // 1.look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, {context: this}); // pushes data to firebase
    // 2.claim it if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // 3.set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  }
  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }
  logout = async () => {
      await firebase.auth().signOut();
      this.setState({ uid: null});
  }
  // to show site logged in after page refresh if it was signed in before
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({user});
      }
    });
  }
  render() {
    const logout = <button onClick={this.logout}>Wyloguj</button>;
    // check if there're login
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    // check if they are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Nie jesteś administratorem</p>
          {logout}
        </div>
      )
    }
    // they must be the owner, just render the inventory
    return(
      <div className="inventory">
        <h2>Składniki menu</h2>
        {logout}
        {/* this gives map of undefined this.props.dishes object, so Object.keys() needs to be use */}
        {/* {this.props.dishes.map(dish => {...})} */}
        {Object.keys(this.props.dishes).map( key => {
          return <EditDishForm
                   key={key}
                   index={key}
                   dish={this.props.dishes[key]}
                   updateDish={this.props.updatedDish}
                   deleteDish={this.props.deleteDish}
                 />
          })}
        <AddDishForm addDish={this.props.addDish} />
        <button onClick={this.props.loadMenu}>Pokaż menu</button>
      </div>
    );
  }
}

export default Inventory;