import { Card, CardActionArea, CardContent, CardMedia, Link, Typography } from '@mui/material'
import React from 'react'

const ArticleCard = ({ article }) => {
    const limitTitleChar = (str) => {
        return str.length > 45 ? str.substring(0, 45) + '...' : str;
    };

    return (
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
    )
}

export default ArticleCard