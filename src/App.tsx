import React, { useState, useEffect } from 'react';
import './App.css';
import { CompletedTask, Task } from './model/responses';
import { getCompletedItems, getItems } from './lib/tasks';

// tuple type below causes issues (which is why 'any' is used). Keep an eye out for this PR:
// https://github.com/facebook/create-react-app/pull/9434
// // const partitionItems = ([tasks, completedTasks]: [Task[], CompletedTask[]]) => {
const partitionItems = ([tasks, completedTasks]: any) => {
  const itemsToDelete: CompletedTask[] = [];
  const itemsToKeep: CompletedTask[] = [];

  completedTasks.forEach((completedTask: CompletedTask) => {
    const isRecurring = tasks.find((task: Task) => task.id === completedTask.task_id)?.due?.is_recurring === true;
    (isRecurring ? itemsToKeep : itemsToDelete).push(completedTask);
  });

  return [itemsToDelete, itemsToKeep];
};

// recursive function that returns a new promise if the limit is not reached.
const getAllCompletedItems = async (cb: any = (f: never) => f, offset = 0, payload: CompletedTask[] = []): Promise<CompletedTask[]> => {
  const response = await getCompletedItems(offset);
  cb(response);
  const mergedItems = payload.concat(response);
  // make a new call if there are items remaining
  if (response.length && payload.length < 200) return getAllCompletedItems(cb, offset + 200, mergedItems);
  return mergedItems;
}

function App() {
  const [paritionedItems, setPartitionedItems] = useState<CompletedTask[][]>([[],[]]);
  const [completedItems, setCompletedItems] = useState<CompletedTask[]>([]);
  const [status, setStatus] = useState<'loading' | 'done'>();

  // get tasks on mount
  useEffect(() => {
    setStatus('loading');

    Promise.all([
      getItems(),
      getAllCompletedItems((response: CompletedTask[]) => setCompletedItems(completedItems => completedItems.concat(response)))
    ])
    .then(response => setPartitionedItems(partitionItems(response)))
  }, []);

  return (
    <div className="App">
      <div>
        Status: {status}
      </div>
      <div>
        {completedItems.length} completed tasks fetched
      </div>

      <div style={{ display: 'flex' }}>
        <div>
          <h2>🗑 Items to delete</h2>
          <ol>
            {paritionedItems?.[0].map((task, i) => <li key={i}>{task.content}</li>)}
          </ol>
        </div>

        <div>
          <h2>♻️ Items to keep (recurring tasks)</h2>
          <ol>
            {paritionedItems?.[1].map((task, i) => <li key={i}>{task.content}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
