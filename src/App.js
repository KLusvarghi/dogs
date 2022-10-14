import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import { UserStorage } from './UserContext';

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
            <Route path="/login/*" element={<Login />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
