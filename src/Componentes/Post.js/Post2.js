import { Avatar, IconButton, Stack } from '@mui/material'
import React from 'react'
import { dataTransform, deletar } from '../../uteis'
import './Post.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import DeleteIcon from '@mui/icons-material/Delete';
export default function Post2({item}) {
  let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
  return (
    <div className='Post_container'>
        <div className='post_header'>
            <div className='post_header_left'>
                <Avatar src={item.avatar}/>
                <div >
                    <div className='post_header_left_titulo'>{item.titulo}</div>
                    <div className='post_header_left_data'>
                        postado por <span>{item.email === usuarioLogado.email ? 'voçê' : item.userName} </span>
                         - {dataTransform(item.data)}
                    </div>
                </div>
            </div>
            <div className='post_header_right'>
                <IconButton aria-label="settings">
                   {item.email === usuarioLogado.email &&
                     <DeleteIcon onClick={()=> deletar(item)} color='error'/>
                   }
                    
                </IconButton>
            </div>
        </div>
        <div className='post_titulo'>{item.postagem}</div>
        <div className='post_body'>
            
            <img className='post_body_imagem' src={item.imagem} alt={item.userName}/>
        </div>
        <div className='post_footer'>
            <Stack direction="row" spacing={0}>
                <IconButton aria-label="delete" color="primary">
                    <ChatBubbleIcon />
                </IconButton>
                <IconButton aria-label="delete"  color="inherit" >
                    <FavoriteIcon />
                </IconButton>
               
            </Stack>
        </div>
    </div>
  )
}
