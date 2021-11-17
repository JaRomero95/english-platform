import React from 'react';
import {Link} from 'react-router-dom';

class AppNavBar extends React.Component {
  render() {
    return (
      <nav>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/irregular-verbs">Irregular Verbs</Link>
        </div>
      </nav>
    );
  }
}

export default AppNavBar;
