import React from 'react';
import { MapProvider } from '../../logic';
import { About, Map, Footer } from '..';
import styles from './index.module.css';

function App() {
  return (
    <MapProvider>
      <div className={ styles.container }>
        <About />
        <Map />
        <Footer />
      </div>
    </MapProvider>
  );
}

export default App;
