import { Box, CircularProgress, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { IHistoricalData } from './types';
import { getLastThreeDays } from './utils';

const CurrencyHistoryChart = ({
  fromCurrency,
  toCurrency,
}: {
  fromCurrency: string;
  toCurrency: string;
}) => {
  const [historicalData, setHistoricalData] = useState<IHistoricalData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchHistoricalData = async () => {
      try {
        const API_KEY = import.meta.env.VITE_EXCHANGE_RATES_API_KEY;
        const dates = getLastThreeDays();
        const fetchedData = [];

        for (const date of dates) {
          const response = await fetch(
            `https://v6.exchangerate-api.com/v6/${API_KEY}/history/${fromCurrency}/${date}`,
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch history chart for date: ${date}`);
          }
          const data = await response.json();
          const rate = data.conversion_rates[toCurrency];
          fetchedData.push({
            date: date.split('/').reverse().join('-'),
            rate: rate,
          });
        }

        setHistoricalData(fetchedData);
      } catch (error) {
        console.error(error);
        setError('Error loading history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoricalData();
  }, [fromCurrency, toCurrency]);

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">History chart</Typography>
      {isLoading ? (
        <CircularProgress sx={{ marginTop: 3 }} />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="rate" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={4000}
          onClose={() => setError(null)}
          message={error}
        />
      )}
    </Box>
  );
};

export default CurrencyHistoryChart;
