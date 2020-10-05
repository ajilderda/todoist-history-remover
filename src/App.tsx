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
import { token } from './lib/auth';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/tasks">
              <ErrorBoundary
                fallback={<Redirect to={{pathname: "/"}}/>}
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
        </div>
      </Router>
    </div>
  );
}

export default App;
