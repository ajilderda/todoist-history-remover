import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import {ErrorBoundary} from 'react-error-boundary'
import './App.css';
import Home from './components/Home';
import Tasks from './components/Tasks';
import ReviewTasks from './components/ReviewTasks';
import ErrorGettingTasks from './components/ErrorGettingTasks';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/tasks">
            <ErrorBoundary
              FallbackComponent={ErrorGettingTasks}
            >
              <Tasks />
            </ErrorBoundary>
          </Route>
          <Route path="/review-tasks">
            <ReviewTasks />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
