import React from 'react';
import styles from './Spinner.module.css';

function Spinner() {
  return (
    <div className={styles.circle}>
      <div className={styles.spinner}></div>
      <div className={styles.inner}></div>
    </div>
  )
;
}

export default Spinner;
