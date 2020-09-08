import React, { useState, useEffect } from 'react';
import './App.css';
import { CompletedTask } from './model/responses';
import { getCompletedItems, getItems } from './lib/tasks';

const items = getItems();
const completedTasks = getCompletedItems();
const getCompletedAndActiveTasks = Promise.all([items, completedTasks]);
const categorizedItems = getCompletedAndActiveTasks.then(([tasks, completedTasks]) => {
  const itemsToDelete: CompletedTask[] = [];
  const itemsToKeep: CompletedTask[] = [];
  completedTasks.forEach(completedTask => {
    const isRecurring = tasks.find(task => task.id === completedTask.task_id)?.due.is_recurring === true;
    (isRecurring ? itemsToKeep : itemsToDelete).push(completedTask);
  });

  return [itemsToDelete, itemsToKeep];
})

function App() {
  const [items, setItems] = useState<CompletedTask[][]>([]);
  const [itemsToDelete, itemsToKeep] = items;

  // get tasks on mount
  useEffect(() => {
    categorizedItems.then(items => setItems(items));
  }, []);

  return (
    <div className="App" style={{ display: 'flex' }}>
      <div>
        <h2>🗑 Items to delete</h2>
        <ul>
          {itemsToDelete?.map((task, i) => <li key={i}>{task.content}</li>)}
        </ul>
      </div>

      <div>
        <h2>♻️ Items to keep (recurring tasks)</h2>
        <ul>
          {itemsToKeep?.map((task, i) => <li key={i}>{task.content}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
