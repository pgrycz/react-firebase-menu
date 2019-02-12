import React from 'react';
import PropTypes from 'prop-types';

/** this.props.tagline in statefull classes => props.tagline in stateless functions =>
 destructuring using {tagline} instead of (props) as function argument */
const Header = ({tagline}) => ( // destructuring arguments
// const Header = props => ( if without destructuring used above
  <header className="top">
    <h1>Smaki azji</h1>
    <h3 className="tagline">
      <span>{tagline}</span>
  {/* <span>{props.tagline}</span> if without destructuring used above */}
    </h3>
  </header>
);

// way to use proptypes in stateless component
Header.propTypes = {
  tagline: PropTypes.string.isRequired
}

export default Header;