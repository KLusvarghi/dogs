import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { USER_POST } from '../../api';
import UserContext from '../../UserContext';


const LoginCreate = () => {
  const username = useForm() // para fazer validação por tipo de input, porem nesse caso não tem nenhum tipo
  const email = useForm('email')
  const password = useForm()

  // usando o contexto para obeter a função de fazer login
  const {userLogin} = React.useContext(UserContext)

  
  // email, usuario, username e senha para a criação de um novo usuário
  async function handleSubmit(event) {
    event.preventDefault();
    const {url, options} = USER_POST({
      // tendo que passar o valor dos input's
      username: username.value,
      email: email.value,
      password: password.value,
    })
    const response = await fetch(url, options)
    if(response.ok){ // só faço o login do usuário caso a resposta seja 'ok'
      userLogin(username.value, password.value) // chamando a função de fazer login passando o usename e senha

    }




    // console.log(username.value) // retorna os dados como id, username, name e email do usuário
    // console.log(response) // me retorna se foi criado com exito ou não
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="Email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Cadastrar</Button>
      </form>
    </section>
  );
};

export default LoginCreate;
