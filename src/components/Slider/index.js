import React from 'react';
import PropTypes from 'prop-types';

function Slider({ className, label, value, onChange }) {
  return (
    <div className={ className }>
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
  className: PropTypes.string,
  label: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

Slider.defaultProps = {
  className: null
};

export default Slider;
