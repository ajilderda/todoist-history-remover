import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { getItems } from './lib/taskActions';
import { getCompletedItems } from './lib/taskActions';

jest.mock('./lib/tasks');

beforeEach(() => {
  // console.log(getItems());
  // console.log(getCompletedItems());
})

test('renders learn react link', () => {
  // const { getByText } = render(<App />);
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

test('Completed Tasks', () => {
});