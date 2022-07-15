import React, { useEffect, useState } from 'react'
import './FormLogin.css'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useNavigate} from 'react-router-dom'
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
export default function FormLogin() {
  let navigate = useNavigate();
  const link = "https://postagem-back.vercel.app/"
  const dispath = useDispatch()
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };



  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [email,setEmail] = useState('');
  const handleChangeEmail = (e)=>{
    setEmail(e.target.value)
  }
  const [errorDesenha,setErroDeSenha] =useState(false)
  const [ erroDeEmail,setErroDeEmail] = useState(false)

  const Logar =async ()=>{
    const formdata = new FormData()
    formdata.append('email',email)
    formdata.append('senha',values.password)
    let usuario =await fetch(link+"jwt",{
       method:"POST",
       body:formdata
    }).then(res=>res.json())
    
    //let usuarioStr = JSON.stringify(usuario);
    //localStorage.setItem('usuarioLogado',usuarioStr)
    
     if(email !== usuario.email){
         setErroDeEmail(true)
         
     }else{
         setErroDeEmail(false)
         if(usuario.token === ""){
             setErroDeSenha(true)
        
         }else{
             setErroDeSenha(false)
             dispath({
              type:"logado",
              payload:{logado:"true"}
             })
                 let usuarioStr = JSON.stringify(usuario);
                 localStorage.setItem('usuarioLogado',usuarioStr)
                 localStorage.setItem('logado','true')
         }
     }

    
  }
  let logado = useSelector(state=>state.loginReducer.logado)
  useEffect(()=>{
    console.log("key: "+localStorage.getItem('usuarioLogado'))
     if(logado==="true"){
         navigate("/home");
     }
     
  },[logado,navigate])
  
 const cadastrar = ()=>{
  navigate("/cadastrar");
 }
  return (
  <div className='ContainerForm'>  
    <div className='camposForm'>
            <h1>Login</h1>
            <TextField
                id="outlined-name"
                label="Email"
                value={email}
                error={erroDeEmail}
                onChange={handleChangeEmail}
                sx={{ m: 1, width: '100%' }}
            />      
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" >
                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    error = {errorDesenha}
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <div className='text_cadastrar'>Não é cadastrado? <span onClick={cadastrar} id='textoCadrastese'>Cadastre-se</span></div>
            <Button variant="contained" sx={{width:"100%"}} onClick={Logar}>Logar</Button>
    </div>
  </div>  
  )
}