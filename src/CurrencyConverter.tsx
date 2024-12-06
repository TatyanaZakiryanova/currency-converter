import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';

type Currency = 'USD' | 'EUR' | 'RUB';

const exchangeRates: Record<Currency, number> = {
  USD: 1.06,
  EUR: 1,
  RUB: 100,
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
  const [toCurrency, setToCurrency] = useState<Currency>('EUR');

  const handleAmountInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || !isNaN(Number(value))) setAmount(value === '' ? 0 : Number(value));
  };

  const handleFromCurrencySelect = (e: SelectChangeEvent<'USD' | 'EUR' | 'RUB'>) => {
    setFromCurrency(e.target.value as Currency);
  };

  const handleToCurrencySelect = (e: SelectChangeEvent<'USD' | 'EUR' | 'RUB'>) => {
    setToCurrency(e.target.value as Currency);
  };

  const convertedAmount = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
  const validConvertedAmount = Math.max(0, convertedAmount);

  return (
    <Box>
      <TextField
        label="Amount"
        type="number"
        value={amount === 0 ? '' : amount}
        onChange={handleAmountInput}
        placeholder="Enter value..."
        sx={{ marginBottom: 3, width: '100%' }}
      />
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>From</InputLabel>
        <Select value={fromCurrency} onChange={handleFromCurrencySelect} label="From">
          {Object.keys(exchangeRates).map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>To</InputLabel>
        <Select value={toCurrency} onChange={handleToCurrencySelect} label="To">
          {Object.keys(exchangeRates).map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        sx={{
          p: 2,
          mt: 3,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #bdd7ff, #c3cfe2)',
          borderRadius: 2,
        }}
      >
        <Typography component="h2" sx={{ color: '#404040', fontSize: '20px' }}>
          Converted amount: {validConvertedAmount.toFixed(2)} {toCurrency}
        </Typography>
      </Box>
    </Box>
  );
};

export default CurrencyConverter;
