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
import Photo from './Components/Photo/Photo'
import UserProfile from './Components/User/UserProfile'

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
            <ProtectedRoute path="conta/*" element={<User />}></ProtectedRoute>
            {/* Assim passando o user para receber ele dentro do componente 'Use.js' */}

            {/* Passando o id de forma dinámica, tendo acesso ao 'id' atrvés do useParams */}
            <Route path="foto/:id" element={<Photo/>}/>

            {/* então quando nesta rota dinamica, sendo esperando um 'user', será renderizado o componente  'UserProfile' */}
            <Route path="perfil/:user" element={<UserProfile />}/>
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
