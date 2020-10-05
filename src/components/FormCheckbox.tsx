import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Checkbox from './Checkbox';

function FormCheckbox({render = f => f}: InferProps<typeof FormCheckbox.propTypes>) {
  return (
    <div>
      <Checkbox />
      {render()}
    </div>
  )
}

FormCheckbox.propTypes = {
  render: PropTypes.func.isRequired,
};

export default FormCheckbox;
