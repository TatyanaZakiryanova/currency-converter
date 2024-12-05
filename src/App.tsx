import { ChangeEvent, useState } from 'react';

type Currency = 'USD' | 'EUR' | 'RUB';

const exchangeRates: Record<Currency, number> = {
  USD: 1.06,
  EUR: 1,
  RUB: 100,
};

const App = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
  const [toCurrency, setToCurrency] = useState<Currency>('EUR');

  const handleAmountInput = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleFromCurrencySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value as Currency);
  };

  const handleToCurrencySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value as Currency);
  };

  const convertedAmount = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];

  return (
    <div>
      <h1>Currency Converter</h1>
      <label htmlFor="amount">
        Amount:
        <input id="amount" type="number" value={amount} onChange={handleAmountInput} />
      </label>
      <label>
        From:
        <select value={fromCurrency} onChange={handleFromCurrencySelect}>
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>
      <label>
        To:
        <select value={toCurrency} onChange={handleToCurrencySelect}>
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>
      <div>
        Converted amount:
        {convertedAmount.toFixed(2)} {toCurrency}
      </div>
    </div>
  );
};

export default App;
