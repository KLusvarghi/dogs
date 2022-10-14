import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as LogDogs } from '../Assets/dogs.svg'; // inportando o svg
import { UserContext } from '../UserContext';

const Header = () => {
  // para ter acesso ao value do userStorage:
  const { data } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      {/* Meu header tendo navegação para a página raiz (home), e para a página de Login */}
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          {' '}
          {/* Sendo o 'aria-label' para acessibilidade */}
          <LogDogs />
        </Link>
        {/* se data (os dados do usuário) existir, ele irá trocar o botão de login pelo nome do usuário e caso ainda não exista ele exibe o botão de login */}
        {data ? (
          <Link className={styles.login} to="/conta">
            {data.nome}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
