import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from 'react'
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [imagem,setImagem]=useState()
  const [titulo,setTitulo]=useState()
  const [postagem,setPostagem]=useState()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const link = "https://postagem-back.vercel.app/upload"
  // const linkoff = "http://localhost:4000/upload"
  function fazerPostagem(params) {
    try {
           
    if(titulo && postagem && imagem){
      const formdata = new FormData()
      formdata.append("imagem",imagem)
      formdata.append("titulo",titulo)
      formdata.append("postagem",postagem)
      fetch(link,{
        method:"POST",
        body:formdata
      })
    
      handleClose()
    }
    } catch (error) {
      alert(error)
    }
    
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{color:"white"}}>
        postar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Post de imagens</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Faça sua postagem
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="titulo"
            label=""
            type="text"
            fullWidth
            value={titulo}
            onChange={e=>setTitulo(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="postagem"
            label=""
            type="text"
            fullWidth
            value={postagem}
            onChange={e=>setPostagem(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="imagem"
            label=""
            type="file"
            fullWidth
            onChange={e=>setImagem(e.target.files[0])}
          />
      
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={fazerPostagem}>postar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}