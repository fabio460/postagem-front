import React,{useEffect, useState} from 'react'
import ResponsiveAppBar from '../MaterialUI/ResponsiveAppBar'
//import RecipeReview from '../MaterialUI/RecipeReviewCard'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Post from './Post.js/Post';
import SideBar from './SideBar/SideBar';
//import BackToTop from '../MaterialUI/BackToTop';
export default function Home() {
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
    <div>
        <header className="App-header ">
            <ResponsiveAppBar usuarioLogado={usuario}/>  
            <div className='postContainer'>
             <div className='postSidebar'>
                <SideBar/>
             </div>
             <div className='postBody'>
                {postagens.map(item=>{
                    return<div >
                        <Post item={item}/>
                    </div>
                })}     

                
             </div>   
           
            </div>
            
        </header>
    </div>
  )
}
