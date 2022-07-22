import { Avatar, Divider, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { dataTransform, deletar, link } from '../../uteis'
import './Post.css'
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
export default function Post2({item}) {
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
  return (
    <div className='Post_container'>
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
        <div className='post_titulo'>{item.postagem !=='undefined' && item.postagem}</div>
        {likes.length === 0 ?<Divider sx={{display:'none'}}/>:<Divider/>}
        <div className='post_footer'>
            
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
                <div className='likesContainerUpp'>
                <Divider sx={{margin:'5px auto'}}/>
                      <Button  startIcon={ <ThumbUpAltIcon/>} color={selecionado?"primary":"inherit"} onClick={e=> ativo(item)}>
                          {selecionado? 'curtido':"curtir"}
                      </Button>
                      <Button sx={{marginLeft:'30px'}}  startIcon={ <CommentIcon />}>
                          comentarios
                      </Button>
                </div>
        </div>
    </div>
  )
}
