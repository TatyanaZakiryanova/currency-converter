import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

import CurrencyHistoryChart from './CurrencyHistoryChart';
import CurrencyNews from './CurrencyNews';
import CurrencyTable from './CurrencyTable';
import { Rates } from './types';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(0);
  const [rates, setRates] = useState<Rates>({});
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const API_KEY = import.meta.env.VITE_EXCHANGE_RATES_API_KEY;
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const data = await response.json();
        setRates(data.conversion_rates);
      } catch (error) {
        console.error(error);
        setError('Error loading currency rates');
      } finally {
        setIsLoading(false);
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
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          margin: 2,
          padding: 5,
          boxShadow: 3,
          borderRadius: '15px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" component="h1" sx={{ color: '#575757' }} gutterBottom>
          Currency converter
        </Typography>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
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
              sx={{ width: '100%', marginY: 2 }}
            />
            <FormControl fullWidth sx={{ marginY: 1 }}>
              <InputLabel>From</InputLabel>
              <Select value={fromCurrency} onChange={handleFromCurrencySelect} label="From">
                {Object.keys(rates).map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginY: 1 }}>
              <InputLabel>To</InputLabel>
              <Select value={toCurrency} onChange={handleToCurrencySelect} label="To">
                {Object.keys(rates).map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              sx={{ margin: 1 }}
              onClick={() => {
                setFromCurrency(toCurrency);
                setToCurrency(fromCurrency);
              }}
            >
              Swap Currencies
            </Button>
            <Box
              sx={{
                p: 2,
                marginY: 1,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #bdd7ff, #c3cfe2)',
                borderRadius: 2,
              }}
            >
              <Typography component="h6" variant="h6" sx={{ color: '#404040' }}>
                Converted amount: {validConvertedAmount.toFixed(2)} {toCurrency}
              </Typography>
            </Box>
            <CurrencyHistoryChart fromCurrency={fromCurrency} toCurrency={toCurrency} />
          </>
        )}
        {error && (
          <Snackbar
            open={Boolean(error)}
            autoHideDuration={4000}
            onClose={() => setError(null)}
            message={error}
          />
        )}
      </Card>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CurrencyTable rates={rates} />
        <CurrencyNews />
      </Box>
    </Box>
  );
};

export default CurrencyConverter;
