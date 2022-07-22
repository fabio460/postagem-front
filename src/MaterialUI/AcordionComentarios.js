

import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
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
    },[comentarios,postagemId,comentarios])

    function deletarMensagem(id) {
      const formdata = new FormData()
            formdata.append('_id',id)
            fetch(link+'deleteComentario',{
                method:'DELETE',
                body:formdata
            }).then(res=>res.json())
    }
    
  return (
    <div>
          <Typography>
             {comentarios.map(elem=>{
                return<div style={{display:'flex'}}>
                  <Avatar src={elem.avatarEnviadoPor}/>
                <div style={{background:'#f7f7f7',margin:"5px",borderRadius:'10px',padding:"5px"}}>
                  <div style={{fontWeight:'bold'}}>{elem.enviadoPor}</div>
                  <div style={{minWidth:"200px"}}>
                    {elem.comentario}
                    <IconButton aria-label="delete" size="small" onClick={()=> deletarMensagem(elem._id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    
                  </div>
                </div>
                </div>
             })}
          </Typography>
      
   
    </div>
  );
}
