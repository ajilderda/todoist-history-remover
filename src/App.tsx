import React, { useState, useEffect } from 'react';
import './App.css';
import { Task } from './model/responses';
import { getCompletedTasks } from './lib/tasks';

function App() {
  const [completedTasks, setCompletedTasks] = useState<Task[]>();

  // get tasks on mount
  useEffect(() => {
    getCompletedTasks().then(tasks => setCompletedTasks(tasks));
  }, []);

  return (
    <div className="App">
      <ul>
        {completedTasks?.map((task, i) => <li key={i}>{task.content}</li>)}
      </ul>
    </div>
  );
}

export default App;
