import React, { useState, useEffect } from 'react';
import { CompletedTask, Task } from '../model/responses';
import { getAllCompletedItems, getItems } from '../lib/taskActions';
import { useAsyncError } from './../hooks/useAsyncError';
import Spinner from './Spinner';
import TaskComponent from './Task';
import FormCheckbox from './FormCheckbox';
import Select from './Select';
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
  const [removeAllItems, setRemoveAllItems] = useState(true);

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
    <div className={`${styles.container} container`}>
      <h2 className={styles.heading}>Queued for removal</h2>
      <p className={styles.subheading}>9.321 completed tasks</p>

      <FormCheckbox
        onCheckboxChange={(e) => setRemoveAllItems(!e.target.checked)}
        label="Only delete items older than"
        render={() => <Select style={{ marginLeft: '6px' }} disabled={removeAllItems} options={[
          { label: '7 days', value: '7' },
          { label: '30 days', value: '30' },
          { label: '90 days', value: '90' },
          { label: '1 year', value: '365' }
        ]} />}
      />

      <ul>
        {paritionedItems?.[0].map((task, i) => {
          return (
            <li key={i}>
              <TaskComponent
                title={task.content}
                checked={false}
                date={task.completed_date}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Tasks;