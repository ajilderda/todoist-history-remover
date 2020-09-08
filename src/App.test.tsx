import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { getItems } from './lib/tasks';
import { getCompletedItems } from './lib/tasks';

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