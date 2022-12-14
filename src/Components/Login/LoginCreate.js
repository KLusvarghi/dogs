import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import { USER_POST } from '../../api';
import UserContext from '../../UserContext';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Head from '../Helper/Head'

// responsvel por cadastrar novos usuários
const LoginCreate = () => {
  const username = useForm(); // para fazer validação por tipo de input, porem nesse caso não tem nenhum tipo
  const email = useForm('email');
  const password = useForm();

  // usando o contexto para obeter a função de fazer login
  const { userLogin } = React.useContext(UserContext);

  const { loading, error, request } = useFetch(); // não sendo necessario pegar o 'data' porque não é necessario do data na criação do usuário

  // email, usuario, username e senha para a criação de um novo usuário
  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      // tendo que passar o valor dos input's
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { response } = await request(url, options); //usando a função criado no 'useFetch'
    if (response.ok) {
      // só faço o login do usuário caso a resposta seja 'ok'
      userLogin(username.value, password.value); // chamando a função de fazer login passando o usename e senha
    }

    // console.log(username.value) // retorna os dados como id, username, name e email do usuário
    // console.log(response) // me retorna se foi criado com exito ou não
  }

  return (

    <section className="animeLeft">
      <Head title="Cadastre-se" description="Página de cadastro do site Dogs"/>

      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="Email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
