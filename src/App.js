import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import { UserStorage } from './UserContext';
import User from './Components/User/User';
import ProtectedRoute from './Components/Helper/ProtectedRoute';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* tendo que envolver todo meu site com o userContext */}
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* tendo que dizer que dentro de /login teá outras subrotas, passando o '/*'  */}
            <Route path="login/*" element={<Login />} />
            {/* criando o componente de conta, tendo '*' por que haverá subrotas dentro dela, passando o elemento 'ProtectedRoute' que é um componente que verifica se o usuário está com o login feito */}
            <Route
              path="conta/*"
              element={
                <ProtectedRoute>
                  <User /> 
                  {/* Assim passando o user para receber ele dentro do componente 'Use.js' */}
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
