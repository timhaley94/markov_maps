import React from 'react';
import {
  START,
  FINISH,
  PATH,
  WALL,
  PIT
} from '../../logic';
import { Element } from '..';

function Legend() {
  return (
    <div>
      <Element value={ START } />
      <Element value={ FINISH } />
      <Element value={ PATH } />
      <Element value={ WALL } />
      <Element value={ PIT } />
    </div>
  );
}

export default Legend;
