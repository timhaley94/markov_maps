import React from 'react';
import PropTypes from 'prop-types';
import { useCell } from '../../logic';
import { Element } from '..';
import styles from './index.module.css';

function Cell({ i, j }) {
  const [state, ref] = useCell(i, j);
  return (
    <div className={ styles.container } ref={ ref }>
      <Element value={ state } i={ i } j={ j } />
    </div>
  );
}

Cell.propTypes = {
  i: PropTypes.number.isRequired,
  j: PropTypes.number.isRequired
};

export default Cell;
