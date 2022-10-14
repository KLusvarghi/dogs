import React from 'react';
import { TOKEN_POST, USER_GET } from './api';

export const UserContext = React.createContext();

//  sendo esse o elemento que deverá envolver todos os outros elementos que terão acesso a esse contexto (UserContext)
export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null)
  const [login, setLogin] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  async function getUser(token){
    const {url, options} = USER_GET(token)
    const response = await fetch(url, options)
    const json = await response.json()
    // sendo o setData as informações do usuário
    setData(json)
    setLogin(true)
    console.log(json)
  }


  async function userLogin(username, password){
    const {url, options} = TOKEN_POST({username, password})
    const tokenResponse = await fetch(url, options)
    // desestruturando e pegando o token logo de uma vez ao invés de fazer json.token depois
    const {token} = await tokenResponse.json()
    // Passando o token para o localStorage
    window.localStorage.setItem('token', token)
    getUser(token)
  }
  
  
  
  return (

    // para poder passar a informação do userStorage para o header e os o outros componentes, é por meio do "value"
    // Assim tendo acesso ao método 'userLogin' em qualuer lugar que o meu userContext for aplicado
    // passando o data que é ps dados do usuário ao fazer login
    <UserContext.Provider value={{ userLogin, data }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
