import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

function Select(props: InferProps<typeof Select.propTypes>) {
  return <div />;
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
};

export default Select;
