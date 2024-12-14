import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { Rates } from './types';

const CurrencyTable = ({ rates }: { rates: Rates }) => {
  const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'RUB'];

  const filteredRates = popularCurrencies.map((currency) => ({
    currency,
    rate: rates[currency] || 'N/A',
  }));

  return (
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
  );
};

export default CurrencyTable;
