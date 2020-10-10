import React from 'react';
import FormCheckbox from './FormCheckbox';
import Task from './Task';
import Button from './Button';
import completedItems from '../mocks/completedItems.get.js';
import Select from './Select';


function ReviewTasks() {
  return (
    <div>
      {completedItems.map((item, index) => (
        <div key={index}>
          <Task
              title={item.content}
              checked={false}
              date={item.completed_date}
          />
        </div>
      ))}

      <Button label={`Remove ${completedItems.length} tasks`} handleClick={() => console.log('handleClick')} />
    </div>
  );
}

export default ReviewTasks;
