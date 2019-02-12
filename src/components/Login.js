import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
  <nav>
    <h2>Logowanie</h2>
    <p>Zaloguj się, aby zarządzać składnikami w menu</p>
    <button
      className="github"
      onClick={() => props.authenticate('Github')}
    >
      Zaloguj z Github
    </button>
    <button
      className="facebook"
      onClick={() => props.authenticate('Facebook')}
    >
      Zaloguj z Facebook
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
}

export default Login;