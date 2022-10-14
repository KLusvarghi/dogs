import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { TOKEN_POST, USER_GET } from '../../api';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  // sendo esse items que eu irei enviar para fazer o fetch
  // console.log(username.value)
  // console.log(password.value)

  // Caso ao site montar na tela já tenha um token do usuário no localSorage, ele já valida para mim

  useEffect(() => {
    // puxando o toquem do localstorage se houver
    const getToken = window.localStorage.getItem('token')
    if(getToken){
      getUser(getToken)
    }
  }, [])


  async function getUser(token) { // função para puzar o Usuário
    const {url, options} = USER_GET(token)
    const response = await fetch(url, options)
    const json = await response.json()
    console.log(json)
  }


  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) { // assim ele tendo que validar os inputs antes de fazer o fech e validar o usuário

      // desestruturando o que vem de TOKEN_POST
      const {url, options} = TOKEN_POST({ // vindo minha api e options de TOKEN_POST
        username: username.value,
        password: password.value,
      })


      const response = await fetch(url, options)
      const json = await response.json()
      //console.log(json) // me retornando o toke do usuário

      // Passando o token para o localstorage
      window.localStorage.setItem('token', json.token)
      getUser(json.token)
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Entrar</Button>
      </form>

      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
