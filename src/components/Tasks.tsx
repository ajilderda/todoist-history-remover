import React, { useState, useEffect } from 'react';
import { CompletedTask, Task } from '../model/responses';
import { getAllCompletedItems, getItems } from '../lib/taskActions';
import { useAsyncError } from './../hooks/useAsyncError';
import { token } from '../lib/auth';
import Spinner from './Spinner';
import styles from './Tasks.module.css';

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

function Tasks(props: any) {
  const [paritionedItems, setPartitionedItems] = useState<CompletedTask[][]>([[],[]]);
  const [completedItems, setCompletedItems] = useState<CompletedTask[]>([]);
  const [status, setStatus] = useState<'loading' | 'done'>();
  const throwError = useAsyncError();

  // get tasks on mount
  useEffect(() => {
    setStatus('loading');

    Promise.all([
      getItems(),
      getAllCompletedItems((response: CompletedTask[]) => setCompletedItems(completedItems => completedItems.concat(response)))
    ])
    .then(response => setPartitionedItems(partitionItems(response)))
    .then(() => setStatus('done'))
    .catch(e => throwError(new Error(e)));
  }, []);

  if (status === 'loading') {
    return (
      <div className={`container ${styles.loadingContainer}`}>
        <div className={styles.loadingContainerBody}>
          <Spinner></Spinner>
          <h1 className={styles.heading}>One moment…</h1>
          {completedItems.length} completed tasks fetched
        </div>
        <div className={styles.loadingContainerFooter}>
          In the next step you can select the tasks you want to remove.
        </div>
      </div>
    )
  }

  return (
    <div>
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
  )
}

export default Tasks;