import  React,{useEffect,useState} from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import '../Componentes/Post.js/Post.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import {dataTransform, link} from '../uteis'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import AcordionComentarios from './AcordionComentarios';
import InputComentarios from './InputComentarios';
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




  let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
  const [selecionado,setSelecionado]=useState(false)
  
  //console.log(usuarioLogado)
  const ativo =async (e)=>{
      console.log(usuarioLogado.email)
    const formdata = new FormData()
    formdata.append('postagemId',e._id)
    formdata.append('recebidoPor',item.email)
    formdata.append('enviadoPor',usuarioLogado.email)
    formdata.append('avatarEmissor',usuarioLogado.avatar)
    formdata.append('nomeEmissor',usuarioLogado.userName)
    formdata.append('likes',1)
    fetch(link+'setLikes',{
        method:"POST",
        body:formdata
    })
  }

  const [likes,setLikes]=useState([])
  async function getLikePorId(postagemId) {
      const formdata = new FormData()
      formdata.append('postagemId',postagemId)
      let f = await fetch(link+'getLikePorId',{
          method:"POST",
          body:formdata
      }).then(res=>res.json())
      setLikes(f)
      //console.log(f)
      return f
  }


  useEffect(()=>{
    async function getLikePorIdAsync() {
        let list = await getLikePorId( item._id)
        setLikes(list)
      }
    getLikePorIdAsync()
    setSelecionado(false)
    likes.filter(elem=>{
      if (elem.enviadoPor===usuarioLogado.email ) {
            setSelecionado(true)
          }
          return ''
      })
      if (likes.length === 0) {
        setSelecionado(false)
    }
  },[likes,usuarioLogado.email,item])
  
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  function ContainersLikes() {
      return(
          <div className='likesContainerDown' >
                            <div className='avatarsGrupo' >
                            {likes.map((e,key)=>{
                                return<>
                                  <Avatar 
                                    
                                     alt={e.nomeEmissor} 
                                     src={e.avatarEmissor}
                                     sx={{
                                         width:"25px",height:"25px",marginLeft:"-7px",
                                         display:()=>{
                                            if(key + 1> 4){
                                                return 'none'
                                            }
                                         }
                                     }}
                                   />
                                </>
                            })}
                              <Avatar
                                
                                sx={{ fontSize:"16px",width: 25, height: 25,marginLeft:"-7px",display:()=>{
                                    if(likes.length <= 4 ){
                                        return 'none'
                                    }
                                } }}
                              >
                                  
                                 +<span >{(likes.length - 4).toString()}</span>
                              </Avatar>
                            </div>
                    </div>
      )
  }
  
  var visivel = 'flex'
  if (likes.length === 0) {
      visivel = 'none'
  }

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
  

  return (
    <Card sx={{ maxWidth: '100%',margin:'20px auto' }} className='Post_container'>
       <div >
          <div className='post_header'>
            <div className='post_header_left'>
                <Avatar src={item.avatar} sx={{marginRight:'7px'}}/>
                <div >
                    <div className='post_header_left_titulo'>{item.userName}</div>
                    <div className='post_header_left_data'>
                        <span>{item.email === usuarioLogado.email ? 'voçê' : item.userName} </span>
                         - {dataTransform(item.data)}
                    </div>
                </div>
            </div>
            <div className='post_header_right'>
                <IconButton aria-label="settings">
                   {item.email === usuarioLogado.email &&
                     <DeleteIcon onClick={()=> deletar(item)} color='primary'/>
                   }
                </IconButton>
                
            </div>
          </div>
          <Divider sx={{margin:'10px auto'}}/>

        <div className='post_body'>
            <img className='post_body_imagem' src={item.imagem} alt={item.userName}/>
        </div>
    
      <CardContent>
      <div className='post_titulo'>{item.postagem !=='undefined' && item.postagem}</div>
       
      <div className='likesContainer'>
          <ContainersLikes/>
                        <div style={{ alignItems:'center',display:visivel}}>
                            <Button color={"success"}  onClick={handleClickOpen('paper')}>
                                <VisibilityIcon/>
                            </Button>
                           
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                scroll={scroll}
                                aria-labelledby="scroll-dialog-title"
                                aria-describedby="scroll-dialog-description"
                            >
                                <DialogTitle id="scroll-dialog-title">Curtidas deste postagem</DialogTitle>
                                <DialogContent dividers={scroll === 'paper'}>
                                <DialogContentText
                                    id="scroll-dialog-description"
                                    ref={descriptionElementRef}
                                    tabIndex={-1}
                                >
                                    {likes.map(elem=>{
                                        return<>
                                          <div style={{display:"flex",alignItems:'center',margin:'7px'}}>
                                            <Avatar src={elem.avatarEmissor} style={{marginRight:'7px'}}/>
                                            <div>{elem.nomeEmissor}</div>
                                          </div>
                                        </>
                                    })}
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose}>Fechar</Button>
                                
                                </DialogActions>
                            </Dialog>
                        </div>
                </div>
          </CardContent>
      <CardActions disableSpacing
         sx={{padding:'0px 20px'}}
      >
          <Button  startIcon={ <ThumbUpAltIcon/>} color={selecionado?"primary":"inherit"} onClick={e=> ativo(item)}>
              {selecionado? 'curtido':"curtir"}
          </Button>
        
        <Button sx={{marginLeft:'20px'}}  startIcon={ <CommentIcon />} onClick={handleExpandClick}>
            comentarios
        </Button>
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
          <Typography paragraph>
          <div className='inputComentarios'> 
                      <InputComentarios 
                         avatar={usuarioLogado.avatar} 
                         enviadoPor={usuarioLogado.userName}
                         recebidoPor={item.userName}
                         postagemId={item._id}
                      />
                    </div>
          </Typography>
         
          <Typography paragraph>
          <AcordionComentarios postagemId={item._id}/>
          </Typography>
          
          
        </CardContent>
      </Collapse>
     </div>
    </Card>
  );
}
