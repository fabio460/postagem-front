

import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import { link } from '../uteis';

export default function AcordionComentarios({postagemId}) {
    const [comentarios,setComentarios]=useState([])

    useEffect(()=>{
        async function getComentarios() {
            const formdata2 = new FormData()
            formdata2.append('postagemId',postagemId)
            let list =await fetch(link+'getComentario',{
                method:'POST',
                body:formdata2
            }).then(res=>res.json())
            setComentarios(list.reverse())
          }
      getComentarios()
    },[comentarios,postagemId])
  return (
    <div>
          <Typography>
             {comentarios.map(elem=>{
                return<div style={{display:'flex'}}>
                  <Avatar src={elem.avatarEnviadoPor}/>
                <div style={{background:'#f7f7f7',margin:"5px",borderRadius:'10px',padding:"5px"}}>
                  <div style={{fontWeight:'bold'}}>{elem.enviadoPor}</div>
                  <div>{elem.comentario}</div>
                </div>
                </div>
             })}
          </Typography>
      
   
    </div>
  );
}
