import React,{useEffect, useState} from 'react'
import ResponsiveAppBar from '../MaterialUI/ResponsiveAppBar'
import RecipeReview from '../MaterialUI/RecipeReviewCard'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
export default function Home() {
    let navigate = useNavigate();
    const link = "https://postagem-back.vercel.app/"
    //const url = 'http://localhost:4000/'
    const [postagens,setPostagens]=useState([])
    const [usuario,setUsuario]=useState(null)
    async function getPost() {
       let lista = await fetch(link).then(res=>res.json())
       setPostagens(lista)
     }
     getPost()
     let logado = useSelector(state=>state.loginReducer.logado)
  
     const dispath = useDispatch()
     let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
     useEffect(()=>{
       
        setUsuario(usuarioLogado)
    
        if(usuarioLogado === null){
            navigate("/"); 
        }
        
     },[logado,navigate,usuarioLogado])
  return (
    <div>
        <header className="App-header ">
            <ResponsiveAppBar usuarioLogado={usuario}/>  
            <div className='postContainer'>
            {postagens.map(item=>{
                return<div >
                    <RecipeReview item={item}/>
                </div>
                })}
            </div>
        </header>
    </div>
  )
}
