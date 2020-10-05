import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Tasks from './components/Tasks';
import ReviewTasks from './components/ReviewTasks';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/tasks">Get tasks</Link>
              </li>
              <li>
                <Link to="/review-tasks">Review tasks</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/tasks">
              <Tasks />
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
