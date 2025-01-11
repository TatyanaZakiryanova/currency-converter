import Box from '@mui/material/Box';

import CurrencyConverter from './components/CurrencyConverter';

const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CurrencyConverter />
    </Box>
  );
};

export default App;
