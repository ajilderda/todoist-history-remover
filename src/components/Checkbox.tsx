import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

function Checkbox(props: InferProps<typeof Checkbox.propTypes>) {
  return <input id={props.id} type="checkbox" onClick={props.onCheckboxChange} />;
}

Checkbox.propTypes = {
  onCheckboxChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default Checkbox;
