import React,{useEffect, useState} from 'react'
import ResponsiveAppBar from '../MaterialUI/ResponsiveAppBar'
//import RecipeReview from '../MaterialUI/RecipeReviewCard'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import Post from './Post.js/Post';
import SideBar from './SideBar/SideBar';
import Post2 from './Post.js/Post2';
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
  
     //let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
     useEffect(()=>{
        let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
        setUsuario(usuarioLogado)
        if(logado === "false"){
            navigate("/"); 
        }
        if(usuarioLogado === null){
            navigate("/"); 
        }
        
     },[logado,navigate])
     var likes = [
        {
            enviadoPor:"Marcio",
            recebidoPor:"fabio@gmail.com"
        },
        {
            enviadoPor:"ruth",
            recebidoPor:'oliveira@gmail.com'
        },
        {
            enviadoPor:"ana",
            recebidoPor:'oliveira@gmail.com'
        },
        {
            enviadoPor:"ruth",
            recebidoPor:"fabio@gmail.com"
        },
        {
            enviadoPor:"junior",
            recebidoPor:"giovana@gmail.com"
        },
        {
            enviadoPor:"Felipe",
            recebidoPor:"fabio@gmail.com"
        }
      ]
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
                        <Post2 likes={likes} item={item}/>
                    </div>
                })}     

                
             </div>   
           
            </div>
            
        </header>
    </div>
  )
}
