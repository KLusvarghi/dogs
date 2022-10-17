import React from 'react';
import UserHeaderNav from './UserHeaderNav';
import styles from './UserHeader.module.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const UserHeader = () => {
  const [title, setTitle] = useState('');
  const location = useLocation(); // para obter a localização atual

  React.useEffect(() => {
    const { pathname } = location; // desestruturando e pegando apenas o pathname / caminho
    switch (pathname) {
      case '/conta/postar':
        setTitle('Poste Sua Foto');
        break;
      case '/conta/estatisticas':
        setTitle('Estatísticas');
        break;
      default:
        setTitle('Minha Conta');
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
