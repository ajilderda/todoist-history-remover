import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

function CompletedTask({title, checked, date}: InferProps<typeof CompletedTask.propTypes>) {
  return (
    <div>
      title: { title }<br />
      date: { date }<br /><br />
    </div>
  );
}

CompletedTask.propTypes = {
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  date: PropTypes.string,
};

CompletedTask.defaultProps = {
  title: 'defaultTile'
}

export default CompletedTask;
