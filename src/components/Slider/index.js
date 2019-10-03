import React from 'react';
import PropTypes from 'prop-types';

function Slider({ label, value, onChange }) {
  return (
    <div>
      <p>{ label }</p>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={ value }
        onChange={ e => onChange(e.target.value) }
      />
    </div>
  );
}

Slider.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Slider;
