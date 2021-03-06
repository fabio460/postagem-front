import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import FormDialog from './FormDialog';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//const pages = ['Products', 'Pricing', 'Blog'];



const ResponsiveAppBar = ({usuarioLogado}) => {
  const [ setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let dispath =useDispatch();
  let navigate = useNavigate();
  const Logout =async ()=>{
    dispath({
      type:"logado",
      payload:{logado:"false"}
     })
      localStorage.setItem('usuarioLogado',null)
      localStorage.setItem('logado','false')
      navigate('/')
  }
  // setTimeout(() => {
  //   Logout()
  // }, 1000000);
  const settings = ['Profile', 'Account', 'Dashboard', <div onClick={Logout}>Logout</div>];
  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" >
      <Container maxWidth="xl" sx={{background:"#f7f7f7",color:'black' }}>
        <Toolbar disableGutters>
          <div className='logo'>
            <Avatar src={'https://treino-sepia.vercel.app/static/media/logo.67123f25.png'} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1}} />
          </div>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {usuarioLogado&&usuarioLogado.userName}
          </Typography>
      
     
          <div className='logo'>
            <Avatar src={'https://treino-sepia.vercel.app/static/media/logo.67123f25.png'} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          </div>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'block', md: 'flex' } }}>
            
              <Button
                key={''}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <FormDialog/>
              </Button>
          
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={usuarioLogado&&usuarioLogado.nome} src={usuarioLogado&&usuarioLogado.avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
