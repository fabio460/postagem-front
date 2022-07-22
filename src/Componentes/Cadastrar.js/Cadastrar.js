


import React, { useEffect, useState } from 'react'
import './Cadastrar.css'
import TextField from '@mui/material/TextField';
import {useNavigate} from 'react-router-dom'
import { Button } from '@mui/material';
import {  useSelector } from 'react-redux';

import UploadButtonsCadastro from '../../MaterialUI/UploadButtonsCadastro';
export default function Cadastrar() {
  let navigate = useNavigate();
  const link = "https://postagem-back.vercel.app/cadastrarUsuario"
 


 
  const [email,setEmail] = useState('');
  const [nome,setNome] = useState('');
  const [avatar,setAvatar] = useState('');
  const [senha,setSenha] = useState('');
  const handleChangeEmail = (e)=>{
    setEmail(e.target.value)
  }
  const handleChangeSenha = (e)=>{
    setSenha(e.target.value)
  }

  const handleChangeNome = (e)=>{
    setNome(e.target.value)
  }
  const [setErroDeSenha] =useState(false)
  const [ erroDeEmail,setErroDeEmail] = useState(false)
  
  const Cadastrar =async ()=>{
     try {
      console.log(avatar)
      console.log(nome)
      const formdata = new FormData()
      formdata.append('email',email)
      formdata.append('senha',senha)
      formdata.append('userName',nome)
      formdata.append('avatar',avatar)
      let usuario =await fetch(link,{
         method:"POST",
         body:formdata
      }).then(res=>res.json())
       if(email !== usuario.email){
           setErroDeEmail(true)   
       }else{
        setErroDeSenha(false)  
       }
       alert('cadastrado com sucesso')
       navigate("/");
     } catch (error) {
      alert(error)
     }
  }
  let logado = useSelector(state=>state.loginReducer.logado)
  useEffect(()=>{
    console.log("key: "+localStorage.getItem('usuarioLogado'))
     if(logado==="true"){
         navigate("/home");
     }
     
  },[logado,navigate])
  

  return (
  <div className='ContainerForm'>  
    <div className='camposForm'>
            <h1>Cadastre-se</h1>
            <TextField
                id="outlined-name"
                label="Nome"
                value={nome}
                error={erroDeEmail}
                onChange={handleChangeNome}
                sx={{ m: 1, width: '100%' }}
            />      
                  <TextField
                id="outlined-name"
                label="Email"
                value={email}
                error={erroDeEmail}
                onChange={handleChangeEmail}
                sx={{ m: 1, width: '100%' }}
            />    
                  <TextField
                id="outlined-name"
                label="Senha"
                value={senha}
                error={erroDeEmail}
                onChange={handleChangeSenha}
                sx={{ m: 1, width: '100%' }}
            />    
            <UploadButtonsCadastro setImagem={setAvatar}/>
            <div></div>
            <Button variant="contained" sx={{width:"100%"}} onClick={Cadastrar}>Cadastrar</Button>
    </div>
  </div>  
  )
}
