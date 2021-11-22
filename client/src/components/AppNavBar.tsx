import React from 'react';
import {Link} from 'react-router-dom';

class AppNavBar extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/irregular-verbs">Irregular Verbs</Link>
          </li>
          <li>
            <Link to="/flash-cards">Flash Cards</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default AppNavBar;
