import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

//  sendo esse o elemento que deverá envolver todos os outros elementos que terão acesso a esse contexto (UserContext)
export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  // funçaõ para fazer logout do usuário
  // como foi passado como dependencia no efeito, temos que criar ela como useCallback
  const userLogOut = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate],
  );

  
  // função para obter o usuário
  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    // sendo o setData as informações do usuário
    setData(json);
    setLogin(true);
  }

  // Função para fazer login
  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenResponse = await fetch(url, options);
      // desestruturando e pegando o token logo de uma vez ao invés de fazer json.token depois
      if (!tokenResponse.ok) throw new Error(`Error: Usuário inválido`);
      const { token } = await tokenResponse.json();
      // Passando o token para o localStorage
      window.localStorage.setItem('token', token);
      await getUser(token);

      // após ele fazer o login ele será jogado para outra página
      navigate('/conta');
    } catch (err) {
      setError(err.message); // o erro definido ali em cima está disponivel no "err"
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }


  // efeito para fazer o acesso do usuário caso tenha um token ativo e válido
  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido'); // assim ele nem tranforma em json se a response.ok for false

          await getUser(token); // caso o token sejá válido, ele chama o método para fazer o login

          // jogando o usuário para a página de sua conta ao logar automaticamente
          navigate('/conta');
        } catch (err) {
          userLogOut();
        } finally {
          setLoading(false);
        }
      }else {
        setLogin(false) // setando o login para false caso não tenha nenhum token
      }
    }
    autoLogin();
    // tendo que passar como dependencia qualquer função criado fora
  }, [userLogOut, navigate]);

  return (
    // para poder passar a informação do userStorage para o header e os o outros componentes, é por meio do "value"
    // Assim tendo acesso ao método 'userLogin' em qualuer lugar que o meu userContext for aplicado
    // passando o data que é os dados do usuário ao fazer login
    // exportando a função de logout e os outros Reativos
    <UserContext.Provider
      value={{ userLogin, userLogOut, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
