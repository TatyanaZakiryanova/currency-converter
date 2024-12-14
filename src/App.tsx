import { Box } from '@mui/material';
import CurrencyConverter from './components/CurrencyConverter';

const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CurrencyConverter />
    </Box>
  );
};

export default App;
