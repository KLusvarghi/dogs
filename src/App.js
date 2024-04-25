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
import Photo from './Components/Photo/Photo';
import UserProfile from './Components/User/UserProfile';
import NotFound from './Components/NotFound';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        {/* tendo que envolver todo meu site com o userContext */}
        <UserStorage>
          <Header />
          <main className="AppBody">
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
                  </ProtectedRoute>
                }
              />

              {/* Assim passando o user para receber ele dentro do componente 'User.js' */}

              {/* Passando o id de forma dinámica, tendo acesso ao 'id' atrvés do useParams */}
              <Route path="foto/:id" element={<Photo />} />

              {/* então quando nesta rota dinamica, sendo esperando um 'user', será renderizado o componente  'UserProfile' */}
              <Route path="perfil/:user" element={<UserProfile />} />

              {/* caminho para página 404, porem tenho que passar essa rota para os itens que tem sub rotas */}
              {/* o '*' quer dizer que qualquer rota diferente das que foram passadas cairá no componente 'NotFound' */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
