import React, { useState, useEffect, useRef } from 'react';
import sub from 'date-fns/sub';
import compareAsc from 'date-fns/compareAsc'
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
const partitionItems = ([tasks, completedTasks]: any, predicate: Function = (f: any) => f) => {
  const itemsToDelete: CompletedTask[] = [];
  const itemsToKeep: CompletedTask[] = [];

  completedTasks.forEach((completedTask: CompletedTask) => {
    const isRecurring = tasks.find((task: Task) => task.id === completedTask.task_id)?.due?.is_recurring === true;
    (isRecurring || !predicate(completedTask) ? itemsToKeep : itemsToDelete).push(completedTask);
  });

  return [itemsToDelete, itemsToKeep];
};

function Tasks(props: any) {
  // all completed items, except recurring
  const [partitionedItems, setPartitionedItems] = useState<CompletedTask[][]>([[], []]);
  const [itemResponse, setItemResponse] = useState<any[]>([[], []]); // see note above about using 'any'
  const [completedItems, setCompletedItems] = useState<CompletedTask[]>([]);
  const [status, setStatus] = useState<'loading' | 'done'>();
  const throwError = useAsyncError();
  const [removeAllItems, setRemoveAllItems] = useState(true);

  const selectRef = useRef<HTMLSelectElement>(null);
  const [deleteOffsetInDays, setDeleteOffsetInDays] = useState<number>(0);
  const dateChangeHandler = (event: any) => setDeleteOffsetInDays(parseInt(event.target.value, 10));

  useEffect(() => setPartitionedItems(partitionItems(itemResponse)), [itemResponse])

  useEffect(() => {
    if (removeAllItems) setDeleteOffsetInDays(0);
    else setDeleteOffsetInDays(parseInt(selectRef.current!.value, 10));

    const dateOffset = sub(Date.now(), { days: deleteOffsetInDays });
    const itemIsOlderThanOffset = (item: CompletedTask) => compareAsc(new Date(item.completed_date), dateOffset) === -1;
    setPartitionedItems(partitionItems(itemResponse, itemIsOlderThanOffset))
  }, [removeAllItems, deleteOffsetInDays, itemResponse]);

  // get tasks on mount
  useEffect(() => {
    setStatus('loading');

    Promise.all([
      getItems(),
      getAllCompletedItems((response: CompletedTask[]) => setCompletedItems(completedItems => completedItems.concat(response)))
    ])
      .then(response => setItemResponse(response))
      .then(() => setStatus('done'))
      .catch(e => throwError(new Error(e)));
  }, [throwError]);

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
        render={() => <Select ref={selectRef} value={deleteOffsetInDays} style={{ marginLeft: '6px' }} disabled={removeAllItems} onChange={dateChangeHandler} options={[
          { label: '7 days', value: '7' },
          { label: '30 days', value: '30' },
          { label: '90 days', value: '90' },
          { label: '1 year', value: '365' }
        ]} />}
      />

      <ul>
        {partitionedItems?.[0].map((task, i) => {
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