import React from 'react';
import { useMap } from '../../logic';
import {
  Cell,
  Controls,
  Legend,
  Row,
  Trials
} from '..';
import styles from './index.module.css';

function Map() {
  const [map, path] = useMap();

  return (
    <div className={ styles.container }>
      <div className={ styles.mapContainer }>
        <Legend className={ styles.legend } />
        <div className={ styles.map }>
          {
            map.map(
              (row, i) => (
                <Row key={ `row-${i}` }>
                  {
                    row.map(
                      (cell, j) => (
                        <Cell
                          key={ `cell-${i}-${j}` }
                          i={ i }
                          j={ j }
                          inPath={
                            path
                              ? path.some(([x, y]) => x === i && y === j)
                              : false
                          }
                        />
                      )
                    )
                  }
                </Row>
              )
            )
          }
        </div>
        <Trials className={ styles.trials } />
      </div>
      <Controls />
    </div>
  );
}

export default Map;
