import React, { Component } from 'react';
import styles from './index.less';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div className={styles.login}>
        <Link to="/layout">golayout</Link>
      </div>
    );
  }
}

export default Login;