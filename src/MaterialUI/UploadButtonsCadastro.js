import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});

export default function UploadButtons({setImagem}) {
  const  [preview,setPreview] = useState([]);
  const [arrayofFiles]=useState([])
  const onSelectFile=(e)=>{
      for (var i=0;i < e.target.files.length;i++){
        arrayofFiles.push(e.target.files[i]);
        setImagem(e.target.files[i])
    }
    
    let images = [];
    arrayofFiles.map((e)=>{
        const ImageUrl =  URL.createObjectURL(e);
        images.push(ImageUrl)
        return ""
    })
    setPreview(images)
  }

  return (
    <div className="App">
    <Stack direction="row" alignItems="center" spacing={2}>
     
     <label htmlFor="icon-button-file">
       <Input accept="image/*" id="icon-button-file" type="file" onChange={onSelectFile}/>
       <IconButton color="primary" aria-label="upload picture" component="span">
         <PhotoCamera />
       </IconButton>
     </label>
   </Stack>
  {preview.map((img,index)=>
    (
      <div key={index}>
       <img src={img} id={index} alt="pic1" width="100%" height="" />
      </div>
    )  
  )}
   </div>
  );
}
