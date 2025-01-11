import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { Rates } from './types';
import { getTodaysDate } from './utils';

const CurrencyTable = ({ rates }: { rates: Rates }) => {
  const popularCurrencies = ['USD', 'EUR', 'JPY', 'GBP', 'CHF', 'CNY', 'RUB', 'CAD', 'AUD'];

  const filteredRates = popularCurrencies.map((currency) => ({
    currency,
    rate: rates[currency] || 'N/A',
  }));

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: {
          xs: '100%',
          sm: '100%',
        },
        maxHeight: 400,
        overflow: 'hidden',
        padding: 5,
        boxShadow: 3,
        borderRadius: '15px',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" component="h2" sx={{ color: '#575757' }} gutterBottom>
          Rates of popular currencies at {getTodaysDate()}
        </Typography>
        <TableContainer component={Paper}>
          <Table
            sx={{
              width: '100%',
            }}
            aria-label="currency table"
          >
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
