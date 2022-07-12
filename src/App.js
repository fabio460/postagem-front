
import './App.css';
import { useState} from 'react'
import ResponsiveAppBar from './MaterialUI/ResponsiveAppBar';
import RecipeReviewCard from './MaterialUI/RecipeReviewCard';
function App() {

  const link = "https://postagem-back.vercel.app/"
  //const url = 'http://localhost:4000/'
  const [postagens,setPostagens]=useState([])
  async function getPost() {
     let lista = await fetch(link).then(res=>res.json())
     setPostagens(lista)
   }
   getPost()

  return (
    <div className="App">
      <header className="App-header ">
      <ResponsiveAppBar/>  
      <div className='postContainer'>
      {postagens.map(item=>{
          return<div >
              <RecipeReviewCard item={item}/>
          </div>
        })}
      </div>
      </header>
    </div>
  );
}

export default App;
