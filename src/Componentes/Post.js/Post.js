import { Avatar } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

export default function Post({item}) {
  
  function dataTransform(data) {
    let dataBruta = data.split("T")
    let dias = dataBruta[0].split('-')
    let horas = dataBruta[1].split(":")
    switch (dias[1]) {
        case '01':
            dias[1] = "Janeiro"
            break;
        case '02':
            dias[1] = "Fevereiro"
            break;
        case '03':
            dias[1] = "Março"
            break;       
        
        case '04':
            dias[1] = "Abril"
            break;
        case '05':
            dias[1] = "Maio"
            break;
        case '06':
            dias[1] = "Junho"
            break;   
        case '07':
            dias[1] = "Julho"
            break;
        case '08':
            dias[1] = "Agosto"
            break;
        case '09':
            dias[1] = "Setembro"
            break;     
        case '10':
            dias[1] = "Outubro"
            break;
        case '11':
            dias[1] = "Novembro"
            break;
        case '12':
            dias[1] = "Dezembro"
            break;             
        default:
            break;
    }
    return dias[2]+" de "+dias[1]+" as "+horas[0]+":"+horas[1]
  }  

  return (
    <div className='postBodyItem'>
      <div className='postBodyItemHeader'>
        <Avatar src={item.avatar} sx={{}}/>
        <div className='postBodyItemHeaderBody'>
          
          <h3 style={{wordWrap:"break-word",width:"60vw"}}>{item.titulo}</h3>
           postado por <span style={{fontWeight:"bolder",wordWrap:"break-word",width:"60vw"}}>{item.userName}</span>
          <span style={{wordWrap:"break-word"}}> - {dataTransform(item.data)}</span>
        </div>
      </div>
      <div className='postBodyItemTitle'>{item.postagem}</div>
      <div style={{display:"flex",justifyContent:"center"}}><img className='imagemPost' src={item.imagem} alt='sem imagem'/></div>
      <div className='postBodyItemFooter'>
        <div>
            {/* <span><Button><ChatBubbleIcon/></Button></span>
            <span><Button><FavoriteIcon/></Button></span> */}
            <Stack direction="row" spacing={1}>
                <IconButton aria-label="delete" color="primary">
                    <ChatBubbleIcon />
                </IconButton>
                <IconButton aria-label="delete"  color="inherit" >
                    <FavoriteIcon />
                </IconButton>
               
            </Stack>
        </div>
      </div>
    </div>
  )
}
