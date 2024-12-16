import { Box, Card, CircularProgress, List, ListItem, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { NewsArticle } from './types';
import { getTodaysDate } from './utils';

const CurrencyNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchCurrencyNews = async () => {
      try {
        const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=currency&sortBy=publishedAt&pageSize=5&language=en&apiKey=${API_KEY}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.log('Error fetching currency news:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occured');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrencyNews();
  }, []);

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
        <Typography component="h3" variant="h6" sx={{ color: '#575757' }}>
          Currency news at {getTodaysDate()}
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <List>
            {news.length > 0 ? (
              news.map((article, index) => (
                <ListItem
                  key={index}
                  sx={{
                    fontSize: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <Typography>{article.title}</Typography>
                  </a>
                  <Typography>{article.description.slice(0, 150) + '...'}</Typography>
                </ListItem>
              ))
            ) : (
              <Typography variant="body2">No news available.</Typography>
            )}
          </List>
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
    </Card>
  );
};

export default CurrencyNews;
