
import './App.css';
import Home from './Componentes/Home';
import FormLogin from './Componentes/Login/Login';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Cadastrar from './Componentes/Cadastrar.js/Cadastrar';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<FormLogin />} />
        <Route path="home" element={<Home />} />
        <Route exact path="/cadastrar" element={<Cadastrar />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
