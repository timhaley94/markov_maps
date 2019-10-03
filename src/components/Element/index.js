import React from 'react';
import PropTypes from 'prop-types';
import {
  START,
  FINISH,
  PATH,
  WALL,
  PIT,
  useElement,
} from '../../logic';
import styles from './index.module.css';

function getColor(v) {
  switch (v) {
    case START:
      return 'blue';
    case FINISH:
      return 'green';
    case PATH:
      return 'yellow';
    case WALL:
      return 'purple';
    case PIT:
      return 'red';
    default:
      return 'yellow';
  }
}

function Element({ value, i, j }) {
  const [ref] = useElement({ value, i, j });

  return (
    <div
      ref={ ref }
      className={ styles.container }
      style={{ backgroundColor: getColor(value) }}
    />
  );
}

Element.propTypes = {
  value: PropTypes.symbol.isRequired,
  i: PropTypes.number,
  j: PropTypes.number
};

Element.defaultProps = {
  i: null,
  j: null
};

export default Element;
