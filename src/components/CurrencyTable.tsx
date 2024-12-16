import {
  Box,
  Card,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { Rates } from './types';

const CurrencyTable = ({ rates }: { rates: Rates }) => {
  const popularCurrencies = ['USD', 'EUR', 'JPY', 'GBP', 'CHF', 'CNY', 'RUB', 'CAD', 'AUD'];

  const filteredRates = popularCurrencies.map((currency) => ({
    currency,
    rate: rates[currency] || 'N/A',
  }));

  return (
    <Card
      sx={{
        maxWidth: 600,
        maxHeight: 350,
        overflow: 'hidden',
        padding: 5,
        margin: 2,
        boxShadow: 3,
        borderRadius: '15px',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" component="h2" sx={{ color: '#575757' }} gutterBottom>
          Rates of popular currencies
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="currency table">
            <TableHead>
              <TableRow>
                <TableCell>Currency</TableCell>
                <TableCell align="right">&#36; Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRates.map(({ currency, rate }) => (
                <TableRow key={currency}>
                  <TableCell component="th" scope="row">
                    {currency}
                  </TableCell>
                  <TableCell align="right">
                    {isNaN(Number(rate)) ? <CircularProgress /> : Number(rate).toFixed(4)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
};

export default CurrencyTable;
