import {
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
        height: '100%',
        overflow: 'auto',
        padding: 5,
        margin: 3,
        boxShadow: 3,
        borderRadius: '15px',
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" component="h2" sx={{ color: '#575757' }} gutterBottom>
        Rates of popular currencies (to USD)
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="currency table">
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell align="right">Rate</TableCell>
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
    </Card>
  );
};

export default CurrencyTable;
