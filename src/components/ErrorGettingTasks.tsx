import React from 'react';
import btnStyles from './Button.module.css';

function ErrorGettingTasks({error, resetErrorBoundary}: any) {
  return (
    <div className="container" role="alert">
      <p>Whoops, something went wrong:</p>
      <pre>{error.message}</pre>
      <p>Are you sure you’re a premium Todoist user?</p>
      <button className={btnStyles.button} onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default ErrorGettingTasks;