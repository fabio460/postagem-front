import  React, {  useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import NearMeIcon from '@mui/icons-material/NearMe';
import {link} from '../uteis'
import { Avatar } from '@mui/material';

export default function InputComentarios({avatar,enviadoPor,recebidoPor,postagemId}) {
  const [mensagem,setMensagem]=useState()
  
  const comentar = async()=>{
    try {
       if (mensagem !== "") {
        const formdata = new FormData()
        formdata.append('comentario',mensagem)
        formdata.append('enviadoPor',enviadoPor)
        formdata.append('recebidoPor',recebidoPor)
        formdata.append('postagemId',postagemId)
        formdata.append('avatarEnviadoPor',avatar)
        fetch(link+'postarComentario',{
            method:'POST',
            body:formdata
        })
        
       }else{
        alert('o campo não pode ser nulo')
       }
       setMensagem("")
       
    } catch (error) {
        alert(error)
    }
  }

  const onKeyUp = (e)=>{
     if(e.code === "Enter"){
        comentar()
     }
  }

  return (
    <Paper
      
      sx={{ p: '2px 4px', display: 'flex',
       alignItems: 'center',
       height:'35px',
       width: '90%',
       background:'#f7f7f7',
       margin:'auto',
       marginTop:'10px',
       borderRadius:'30px',
       fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, elvetica Neue, sans-serif'
      }}
    >
       <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <Avatar sx={{width:'25px',height:'25px'}} src={avatar}/>
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Escreva seu momentario"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={e=>setMensagem(e.target.value)}
        onKeyUp={onKeyUp}
        value={mensagem}
      />
      
      <IconButton color="primary" sx={{ p: '7px' }} aria-label="directions" onClick={comentar}>
        <NearMeIcon />
      </IconButton>
    </Paper>
  );
}
