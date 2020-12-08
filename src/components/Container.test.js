import React from 'react';
import { render, screen } from '@testing-library/react';
import Container from './Container';
 
describe('Container', () => {
  beforeEach(() => {
    render(
      <Container leftColumn={{ size: 1, children: 'left child' }}
                 rightColumn={{ size: 2, children: 'right child' }} />
    );
  });

  test('renders left column', () => {
    const leftColumn = screen.queryByText('left child');

    expect(leftColumn).toBeInTheDocument();
    expect(leftColumn).toHaveClass('ant-col-1');
  });

  test('renders right column', () => {
    const rightColumn = screen.queryByText('right child');

    expect(rightColumn).toBeInTheDocument();
    expect(rightColumn).toHaveClass('ant-col-2');
  });
});
