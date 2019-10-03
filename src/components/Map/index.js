import React, { useState } from 'react';
import { useMap } from '../../logic';
import { Cell, Legend, Row, Slider } from '..';
import styles from './index.module.css';

function Map() {
  const [randomness, setRandomness] = useState(10);
  const [map] = useMap();

  return (
    <div>
      <Slider
        label="Randomness"
        value={ randomness }
        onChange={ setRandomness }
      />
      <div className={ styles.content }>
        {
          map.map(
            (row, i) => (
              <Row key={ `row-${i}` }>
                {
                  row.map(
                    (cell, j) => (
                      <Cell key={ `cell-${i}-${j}` } i={ i } j={ j } />
                    )
                  )
                }
              </Row>
            )
          )
        }
      </div>
      <Legend />
    </div>
  );
}

export default Map;
