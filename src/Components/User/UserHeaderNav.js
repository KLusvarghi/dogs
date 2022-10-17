import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg';
import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg';
import { ReactComponent as AdicionarFotos } from '../../Assets/adicionar.svg';
import { ReactComponent as Sair } from '../../Assets/sair.svg';
import styles from './UserHeaderNav.module.css';
import useMedia from '../../Hooks/useMedia';

const UserHeaderNav = () => {
  // recebendo um hook que verifica o tamanho da tela, passando como paramentro um media query do tamanho. Rebendo como retorno um true ou false caso a tela obtenha o tamanho passando como parametro
  const mobile = useMedia('(max-width: 40rem)');

  // importando o contexto para ter acesso a função "userLogOut"
  const { userLogOut } = React.useContext(UserContext);

  const [mobileMenu, setMobileMenu] = React.useState(false);

  // para toda vez que eu mudar de rota ele fechar o menuMobile
  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);


  return (
    <>
      {/* passando o aria label já que não irá ter nome */}
      {mobile && (
        <button
          aria-label="Menu"
          // caso o mobileMenu esteja ativo elee asiciona outra classe ao button
          className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      {/* Caso o mobile seja true ele adicioan uma classe, caso contrario ele adiciona outra  */}
      <nav className={`${mobile ? styles.navMobile : styles.nav} ${ mobileMenu && styles.navMobileActive}`}>
        {/* passando os links em relação a página raiz do usuário que é "conta" */}
        <NavLink to="/conta" end>
          <MinhasFotos />
          {/* Esses textos só iram aparecer quando o menu mobile estiver ativo */}
          {mobile && 'Minhas Fotos'}
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <Estatisticas />
          {mobile && 'Estatisticas'}
        </NavLink>
        <NavLink to="/conta/postar">
          <AdicionarFotos />
          {mobile && 'Adicioanr Foto'}
        </NavLink>
        <button onClick={userLogOut}>
          <Sair />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
