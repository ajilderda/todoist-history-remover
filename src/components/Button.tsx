import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import styles from './Button.module.css';

function Button({label, handleClick}: InferProps<typeof Button.propTypes>) {
  return <button className={styles.button} onClick={handleClick}>{label}</button>;
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  handleClick: (f: any) => f,
};

export default Button;
