import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

type Rates = Record<string, number>;

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(0);
  const [rates, setRates] = useState<Rates>({});
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://v6.exchangerate-api.com/v6/460b6f3df688ca4bbb39ac9e/latest/USD',
        );
        const data = await response.json();
        setRates(data.conversion_rates);
      } catch {
        console.error('API Error');
      }
    };
    fetchData();
  }, []);

  const handleAmountInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || !isNaN(Number(value))) setAmount(value === '' ? 0 : Number(value));
  };

  const handleFromCurrencySelect = (e: SelectChangeEvent<string>) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencySelect = (e: SelectChangeEvent<string>) => {
    setToCurrency(e.target.value);
  };

  const convertedAmount =
    rates[fromCurrency] && rates[toCurrency]
      ? (amount / rates[fromCurrency]) * rates[toCurrency]
      : 0;
  const validConvertedAmount = Math.max(0, convertedAmount);

  return (
    <Box>
      {Object.keys(rates).length === 0 ? (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
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
              {Object.keys(rates).map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>To</InputLabel>
            <Select value={toCurrency} onChange={handleToCurrencySelect} label="To">
              {Object.keys(rates).map((currency) => (
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
        </>
      )}
    </Box>
  );
};

export default CurrencyConverter;
