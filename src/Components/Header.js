import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as LogDogs } from '../Assets/dogs.svg'; // inportando o svg

const Header = () => {
  return (
    <header className={styles.header}>
      {/* Meu header tendo navegação para a página raiz (home), e para a página de Login */}
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label='Dogs - Home'> {/* Sendo o 'aria-label' para acessibilidade */}
          <LogDogs />
        </Link>
        <Link className={styles.login} to="/login">Login / Criar</Link>
      </nav>
    </header>
  );
};

export default Header;
