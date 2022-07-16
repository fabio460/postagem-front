import  React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ResponsiveAppBar from './ResponsiveAppBar';
import Post from '../Componentes/Post.js/Post';

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function BackToTop(props) {

    let navigate = useNavigate();
    const link = "https://postagem-back.vercel.app/"
    //const url = 'http://localhost:4000/'
    const [postagens,setPostagens]=useState([])
    const [usuario,setUsuario]=useState(null)
    async function getPost() {
       let lista = await fetch(link).then(res=>res.json())
       setPostagens(lista.reverse())
     }
     getPost()
     let logado = useSelector(state=>state.loginReducer.logado)
  
     
     useEffect(()=>{
        let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
        setUsuario(usuarioLogado)
        console.log(usuarioLogado)
        if(logado === "false"){
            navigate("/"); 
        }
        if(usuarioLogado === null){
            navigate("/"); 
        }
        
     },[logado,navigate])
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
             <ResponsiveAppBar usuarioLogado={usuario}/>  
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Box sx={{ my: 2 }}>
        <div className='postContainer'>
             <div className='postSidebar'>
                sidebar
             </div>
             <div className='postBody'>
                {postagens.map(item=>{
                    return<div >
                        <Post item={item}/>
                    </div>
                })}     

                
             </div>   
           
            </div>
        </Box>
      </Container>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
