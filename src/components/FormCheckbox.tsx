import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Checkbox from './Checkbox';
import styles from './FormCheckbox.module.css';

function FormCheckbox({label, render = f => f, onCheckboxChange}: InferProps<typeof FormCheckbox.propTypes>) {
  return (
    <div>
      <label>
        <Checkbox onCheckboxChange={onCheckboxChange} />
        { label }
      </label>
      {render && render()}
    </div>
  )
}

FormCheckbox.propTypes = {
  label: PropTypes.string,
  onCheckboxChange: PropTypes.func.isRequired,
  render: PropTypes.func,
};

FormCheckbox.defaultProps = {
  onCheckboxChange: (f: any) => f
}

export default FormCheckbox;
