import React, { forwardRef } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import styles from './Select.module.css';

const Select: any = forwardRef(({style, options, disabled, onChange}: InferProps<typeof Select.propTypes>, ref: any) => {
  return <select
    onChange={onChange}
    style={style as object}
    ref={ref}
    className={styles.select}
    disabled={disabled ? true : false}
  >
    {options.map(({value, label} = options, index: number) => {
      return (
        <option key={index} value={value}>
            {label}
        </option>
      )
    })}
  </select>;
});

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  options: PropTypes.array.isRequired,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

Select.defaultProps = {
  style: {}
}

export default Select;
