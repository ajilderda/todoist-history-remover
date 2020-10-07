import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

function Select({options, disabled}: InferProps<typeof Select.propTypes>) {
  return <select disabled={disabled ? true : false}>
    {options.map(({value, label} = options, index) => {
      return (
        <option key={index} value={value}>
            {label}
        </option>
      )
    })}
  </select>;
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool
};

export default Select;
