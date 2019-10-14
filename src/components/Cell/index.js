import React from 'react';
import PropTypes from 'prop-types';
import { useCell } from '../../logic';
import { Element } from '..';
import styles from './index.module.css';

function Cell({ i, j, inPath }) {
  const [state, ref] = useCell(i, j);
  return (
    <div className={ styles.container } ref={ ref }>
      {
        inPath
          ? <div className={ styles.path } />
          : null
      }
      <Element value={ state } i={ i } j={ j } />
    </div>
  );
}

Cell.propTypes = {
  i: PropTypes.number.isRequired,
  j: PropTypes.number.isRequired,
  inPath: PropTypes.bool
};

Cell.defaultProps = {
  inPath: false
};

export default Cell;
