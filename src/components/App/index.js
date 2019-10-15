import React from 'react';
import Ribbon from "react-github-ribbon";
import { MapProvider } from '../../logic';
import { About, Map, Footer } from '..';
import styles from './index.module.css';

function App() {
  return (
    <MapProvider>
      <div className={ styles.container }>
        <Ribbon
          user="timhaley94"
          repo="markov_maps"
          fill="2d2d2d"
          color="white"
        />
        <About />
        <Map />
        <Footer />
      </div>
    </MapProvider>
  );
}

export default App;
