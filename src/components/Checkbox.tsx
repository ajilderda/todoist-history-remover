import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

function Checkbox(props: InferProps<typeof Checkbox.propTypes>) {
  return <input type="checkbox" onClick={props.onCheckboxChange} />;
}

Checkbox.propTypes = {
  onCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
