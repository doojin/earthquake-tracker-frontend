import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Label from './Label';

describe('Label', () => {
  beforeEach(() => {
    render(
      <React.Fragment>
        <input type="text" id="my-input"/>
        <Label htmlFor="my-input" text="label text"/>
      </React.Fragment>
    );
  });

  test('renders label text', () => {
    const label = screen.queryByText('label text');
    expect(label).toBeInTheDocument();
  });

  test('binds to the input', async () => {
    const label = screen.queryByText('label text');
    const input = screen.queryByRole('textbox', { name: /label text/ });

    expect(input).not.toHaveFocus();

    userEvent.click(label);

    expect(input).toHaveFocus();
  });

  describe('bottomMargin property passed', () => {
    beforeEach(() => {
      render(
        <Label htmlFor="my-input" text="my input" bottomMargin/>
      );
    });

    test('adding bottom margin to the label', () => {
      expect(screen.getByText('my input')).toHaveClass('bottomMargin');
    });
  });

  describe('bottomMargin property not passed', () => {
    beforeEach(() => {
      render(
        <Label htmlFor="my-input" text="my input"/>
      );
    });

    test('not adding bottom margin to the label', () => {
      expect(screen.getByText('my input')).not.toHaveClass('bottomMargin');
    });
  });
});
