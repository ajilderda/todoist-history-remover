import React from 'react';
import { Link } from "react-router-dom";
import { generateState } from '../utils/oauth-state';
import Button from './Button';

const loginToTodoist = () => {
  const state = generateState();
  sessionStorage.setItem('state', state);
  //redirect
  window.location.assign(`/.netlify/functions/auth?state=${state}`);
}

function Home(props: any) {
  return (
    <div>
      <h1>
        Batch delete your completed Todoist tasks
      </h1>
      <p>
        Because you don’t want your entire private life remain in the cloud.
      </p>
      <Button label='Login to Todoist' handleClick={loginToTodoist} />
    </div>
  )
}

export default Home;
