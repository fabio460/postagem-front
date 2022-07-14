import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({item}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const deletar = ()=>{
    let arquivo = item.imagem.split('/')
    let fileName = arquivo[arquivo.length - 1]
    const formdata = new FormData()
    formdata.append("_id",item._id)
    formdata.append("fileName",fileName)
    fetch("https://postagem-back.vercel.app/delete",{
        method:"DELETE",
        body:formdata
    })
  
  }
  
  const dat = item.data
  var data = ""
  if (dat) {
     data = dat.split('T')[0].split('-')
    console.log()
  }
  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" alt={item.userName} src={item.avatar}/>
            
          
        }
        action={
          <IconButton aria-label="settings">
            <DeleteIcon onClick={deletar}/>
          </IconButton>
        }
        title={item.userName}
        subheader={data[2]+"/"+data[1]+"/"+data[0]}
      />
      <CardMedia
        component="img"
        height="194"
        image={item.imagem}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.titulo}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Postagem:</Typography>
         
          <Typography paragraph>
            {item.postagem}
          </Typography>
          
          
        </CardContent>
      </Collapse>
    </Card>
  );
}
