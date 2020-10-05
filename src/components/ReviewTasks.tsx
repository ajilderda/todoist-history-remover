import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import FormCheckbox from './FormCheckbox';
import CompletedTask from './CompletedTask';
import Button from './Button';
import completedItems from '../mocks/completedItems.get.js';
import Select from './Select';


function ReviewTasks() {
  return (
    <div>
      <FormCheckbox render={() => (<Select options={[{ label: 'label', value: 'value' }]} />)} />

      {completedItems.map((item, index) => (
        <div key={index}>
          <CompletedTask
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
