import React from 'react';
import { Container } from '@mui/material';
import ArticlesList from './components/ArticlesList';


const App = () => {
  console.log(process.env.REACT_APP_NYT_API_KEY)
  return (
    <Container>
      <ArticlesList />
    </Container>
  )
}

export default App;
