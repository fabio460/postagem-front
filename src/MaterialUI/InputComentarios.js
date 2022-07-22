import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import NearMeIcon from '@mui/icons-material/NearMe';

import { Avatar } from '@mui/material';

export default function InputComentarios() {
  return (
    <Paper
      
      sx={{ p: '2px 4px', display: 'flex',
       alignItems: 'center',
       height:'30px',
       width: '90%',
       background:'#f7f7f7',
    //    margin:'15px auto -15px auto ',
       margin:'auto',
       marginTop:'10px',
       borderRadius:'30px',
       fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, elvetica Neue, sans-serif'
      }}
    >
       <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <Avatar sx={{width:'25px',height:'25px'}} />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Escreva seu momentario"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        
      </IconButton>
      
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <NearMeIcon />
      </IconButton>
    </Paper>
  );
}
