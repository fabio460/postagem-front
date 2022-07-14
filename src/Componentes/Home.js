import React,{useEffect, useState} from 'react'
import ResponsiveAppBar from '../MaterialUI/ResponsiveAppBar'
import RecipeReview from '../MaterialUI/RecipeReviewCard'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
        console.log(usuarioLogado)
     },[logado,navigate])
     
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
