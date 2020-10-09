import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import styles from './Select.module.css';

function Select({style, options, disabled}: InferProps<typeof Select.propTypes>) {
  return <select style={style as object} className={styles.select} disabled={disabled ? true : false}>
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
  style: PropTypes.object,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool
};

Select.defaultProps = {
  style: {}
}

export default Select;
