import React from 'react';
import { render, screen } from '@testing-library/react';
import { subDays } from 'date-fns';
import RelativeDate from './RelativeDate';

describe('RelativeDate', () => {
  test('formats date correctly', () => {
    const timestamp = subDays(Date.now(), 2).getTime();

    render(<RelativeDate timestamp={ timestamp } />);

    const formattedDate = screen.queryByText('2 days ago');
    expect(formattedDate).toBeInTheDocument();
  });
});
