import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTrials } from '../../logic';
import styles from './index.module.css';

function Trials({ className }) {
  const [trials] = useTrials();

  return (
    <table className={ classNames(className, styles.container) }>
      <thead>
        <tr className={ styles.row }>
          <th className={ styles.headerCell }>Trial</th>
          <th className={ styles.headerCell }>No. of Steps</th>
          <th className={ styles.headerCell }>Payout</th>
        </tr>
      </thead>
      <tbody>
        {
          trials.map(
            ({ number, payout, path }) => (
              <tr className={ styles.row } key={ number }>
                <td className={ styles.cell }>{ number }</td>
                <td className={ styles.cell }>{ path.length }</td>
                <td className={ styles.cell }>{ payout }</td>
              </tr>
            )
          )
        }
      </tbody>
    </table>
  );
}

Trials.propTypes = {
  className: PropTypes.string
};

Trials.defaultProps = {
  className: null
};

export default Trials;
