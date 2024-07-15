// src/components/ArticlesList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import ArticleCard from './ArticleCard';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [period, setPeriod] = useState(1);

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
            <ArticleCard article={article}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ArticlesList;
