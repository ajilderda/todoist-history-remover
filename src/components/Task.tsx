import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import styles from './Task.module.css';

function Task({title, checked, date}: InferProps<typeof Task.propTypes>) {
  return (
    <div className={styles.task}>
      <span className={styles.title}>{ title }</span>
      <span className={styles.date}>{ date }</span>
    </div>
  );
}

Task.propTypes = {
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  date: PropTypes.string,
};

Task.defaultProps = {
  title: 'defaultTile'
}

export default Task;
