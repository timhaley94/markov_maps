import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './index.module.css';

function Row({ children }) {
  return (
    <div className={ styles.container }>
      { children }
    </div>
  );
}

Row.propTypes = {
  children: PropTypes.node.isRequired
};

export default Row;
