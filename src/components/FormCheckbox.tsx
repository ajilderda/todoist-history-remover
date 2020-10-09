import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Checkbox from './Checkbox';
import styles from './FormCheckbox.module.css';
import { useComponentId } from '../hooks/useComponentId';

function FormCheckbox({label, render = f => f, onCheckboxChange}: InferProps<typeof FormCheckbox.propTypes>) {
  const id = `${useComponentId()}`;

  return (
    <div className={styles.container}>
      <Checkbox onCheckboxChange={onCheckboxChange} id={id} />
      <label htmlFor={id} className={styles.label}>
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
