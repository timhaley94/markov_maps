import React from 'react';
import PropTypes from 'prop-types';
import {
  START,
  FINISH,
  PATH,
  WALL,
  PIT
} from '../../logic';
import { Element } from '..';

function Legend({ className }) {
  return (
    <div className={ className }>
      <Element value={ START } />
      <Element value={ FINISH } />
      <Element value={ PATH } />
      <Element value={ WALL } />
      <Element value={ PIT } />
    </div>
  );
}

Legend.propTypes = {
  className: PropTypes.string
};

Legend.defaultProps = {
  className: null
};

export default Legend;
