import React, { Component } from 'react';
import styles from './index.less';

class Error404 extends Component {
  render() {
    return (
      <div className={styles.error404}>
        404，页面走丢了:)
      </div>
    );
  }
}

export default Error404;