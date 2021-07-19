import React from 'react';
import { generateState } from '../utils/oauth-state';
import Button from './Button';
import styles from './Home.module.css';

const loginToTodoist = () => {
  const state = generateState();
  sessionStorage.setItem('state', state);
  //redirect
  window.location.assign(`/.netlify/functions/auth?state=${state}`);
}

function Home(props: any) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Are you an avid Todoist user who cares about privacy?
      </h1>
      <p>
        This app is for you. Batch delete your completed tasks and reduce your digital footprint in a few clicks.
      </p>
      <Button label='Login to Todoist' handleClick={loginToTodoist} />
      * Please note that you need to be a Premium Todoist user to be able to use this app
    </div>
  )
}

export default Home;
