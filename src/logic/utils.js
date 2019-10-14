import { useEffect, useRef } from 'react';
import config from '../config';

export function useInterval(callback) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, config.TRIAL_INTERVAL);
    return () => clearInterval(id);
  });
}
