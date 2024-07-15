// src/components/ArticlesList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [period, setPeriod] = useState(1);

  const limitTitleChar = (str) => {
    return str.length > 45 ? str.substring(0, 45) + '...' : str;
  };

  const fetchData = async (period) => {
    const result = await axios(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`
    );
    setArticles(result.data.results);
    console.log(result.data.results)
  };

  useEffect(() => {
    fetchData(period);

  }, [period]);

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <Container >
      <Typography variant="h4" component="h1" gutterBottom sx={{my:'10px', textAlign:'center'}}>
        Most Popular Articles
      </Typography>
      <FormControl sx={{marginBottom:'20px'}} fullWidth margin="normal">
        <InputLabel id="period-select-label">Select Period</InputLabel>
        <Select
          labelId="period-select-label"
          value={period}
          onChange={handlePeriodChange}
          variant='filled'
        >
          <MenuItem value={1}>1 Day</MenuItem>
          <MenuItem value={7}>7 Days</MenuItem>
          <MenuItem value={30}>30 Days</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article?.id}>
            <Card>
              <CardActionArea component={Link} href={article?.url} target="_blank" rel="noopener noreferrer">
                <CardMedia
                  component="img"
                  height="140"
                  image={article?.media[0] && article?.media[0]['media-metadata'][2].url}
                  alt={article?.title}
                />
                <CardContent>
                  <Typography className='description' gutterBottom variant="h5" component="div">
                    {limitTitleChar(article.title)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Published on: {article.published_date}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ArticlesList;
