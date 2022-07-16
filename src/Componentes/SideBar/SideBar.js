import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function SideBar() {
  const [list,setList]=useState([])
  const link = "https://postagem-back.vercel.app/getUsuarios"
  async function getUsuarios(params) {
     let l = await fetch(link).then(r=>r.json())  
     setList(l)
  }
  useEffect(()=>{
    getUsuarios()
    console.log(list.userName)
  },[])  
  
  return (
    <>
       <div style={{padding:"17px"}}>
        {list.map(item=>{
            return<div style={{display:"flex",alignItems:"center",margin:"10px 0px"}}>
                <Avatar src={item.avatar} alt={item.userName} sx={{marginRight:"10px"}}/>
                <div>{item.userName}</div>
            </div>
        })}
       </div>
    </>
  )
}
