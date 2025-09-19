import ResultBox from './ResultBox';
import { render, screen, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('should render component' , () => {
    render(<ResultBox from="PLN" to="USD" amount={100}/>)
  });

  const amountPLN = [
    {amount: 20, result: 'PLN 20.00 = $5.71'},
    {amount: 35, result: 'PLN 35.00 = $10.00'},
    {amount: 150, result: 'PLN 150.00 = $42.86'}
  ];
  for(const objTest of amountPLN){
    it("should render proper info about conversion when PLN -> USD", () => {  
      render(<ResultBox from="PLN" to="USD" amount={objTest.amount}/>)

      const mainContainer = screen.getByTestId('mainContainer');

      expect(mainContainer).toHaveTextContent(objTest.result);
    });
  };

  const amountUSD = [
    {amount: '4', result: '$4.00 = PLN 14.00'},
    {amount: '14', result: '$14.00 = PLN 49.00'},
    {amount: "117", result: '$117.00 = PLN 409.50'}
  ];
  for(const objTest of amountUSD){
    it("should render proper info about conversion when USD -> PLN", () => {
      render(<ResultBox from="USD" to="PLN" amount={objTest.amount}/>)

      const mainContainer = screen.getByTestId('mainContainer');

      expect(mainContainer).toHaveTextContent(objTest.result)
    });
  };

  const sameAmount = [
    {amount: 15, currency: 'PLN', result: 'PLN 15.00 = PLN 15.00'},
    {amount: 127, currency: 'USD', result: '$127.00 = $127.00'}
  ];
  for(const objTest of sameAmount){
    it("should render proper info about same values", () => {
      render(<ResultBox  from={objTest.currency} to={objTest.currency} amount={objTest.amount}/>)

      const mainContainer = screen.getByTestId('mainContainer');

      expect(mainContainer).toHaveTextContent(objTest.result);
    });
  };

  it('should be wrong value' , () => {
    render(<ResultBox from="PLN" to="USD" amount={-1}/>)

    const mainContainer = screen.getByTestId('mainContainer');

    expect(mainContainer).toHaveTextContent("Wrong value…");
  });
});