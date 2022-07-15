import * as React from 'react';
import { styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});

export default function UploadButtons({setImagem}) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
     
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" onChange={e=>setImagem(e.target.files[0])}/>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </Stack>
  );
}
