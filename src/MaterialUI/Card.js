import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function Cards({item}) {
  return (
    <Card sx={{ width: '100% '}} onClick={()=>alert(item._id)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={item.imagem}
          alt="green iguana"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {item.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.postagem}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
