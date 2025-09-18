import { render, screen, cleanup } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';

describe('Component CurrencyForm', () => {
  const testCases = [
    { amount: '100', from: 'PLN', to: 'USD' },
    { amount: '20', from: 'USD', to: 'PLN' },
    { amount: '200', from: 'PLN', to: 'USD' },
    { amount: '345', from: 'USD', to: 'PLN' },
  ];
  for(const testObj of testCases){
    it('should run action callback with proper data on form submit', () => {
      const action = jest.fn();

      // render component
      render(<CurrencyForm action={action} />);

      // find “convert” button
      const submitButton = screen.getByText('Convert');
      const amountField = screen.getByTestId('amount');
      const selectFrom = screen.getByTestId('select-from');
      const selectTo = screen.getByTestId('select-to');

      // simulate user click on "convert" button
      userEvent.type(amountField, testObj.amount);
      userEvent.selectOptions(selectFrom, testObj.from);
      userEvent.selectOptions(selectTo, testObj.to);
      userEvent.click(submitButton);

      // check if action callback was called once
      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({ amount: Number(testObj.amount), from: testObj.from, to: testObj.to });

      cleanup();
    });
  }
});
