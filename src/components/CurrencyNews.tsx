import { Box, Card, List, ListItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { NewsArticle } from './types';

const CurrencyNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchCurrencyNews = async () => {
      try {
        const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=currency&sortBy=publishedAt&pageSize=5&apiKey=${API_KEY}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.log('Error fetching currency news:', error);
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
        <Typography variant="h6" sx={{ color: '#575757' }}>
          Currency news
        </Typography>
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
      </Box>
    </Card>
  );
};

export default CurrencyNews;
