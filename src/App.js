
import './App.css';
import Home from './Componentes/Home';
import FormLogin from './Componentes/Login/Login';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  
} from "react-router-dom";
import { useSelector } from 'react-redux';
function App() {
  let logado = useSelector(state=>state.loginReducer.logado)
  const Private = ()=>{
     return <div>
      {logado?<Home/>:<Navigate to="/"/>}
     </div>
  }
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<FormLogin />} />
        <Route path="home" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
