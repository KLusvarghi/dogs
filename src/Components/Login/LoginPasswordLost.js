import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_LOST } from '../../api';
import Error from '../Helper/Error';
import Head from '../Helper/Head'


// Componente responsavel por verificar o usuario / email digitado para o usuário e enviar um email para ele
const LoginPasswordLost = () => {
  // assim ele irá validar o input digitado pelo usuário
  const login = useForm();

  // como terei que fazer uma requisição a api, eu faço um fetch
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    // só fazendo esse processo se o validade retornar true
    if (login.validate()) {
      // tendo acesso ao método validade por conta do 'useForm'
      // recebendo como parametro o valor que o usuário digitou no login e a url que ele está que é:
      const { url, options } = PASSWORD_LOST({
        login: login.value,

        // invés de eu passar a url na mão eu posso pegar com o window.location
        // console.log(window.location)
        // sendo o retorno 'http://localhost:3000/login/perdeu', tendo que sbstituir 'perdeu' por 'reset'
        url: window.location.href.replace('perdeu', 'reset'),
      });
      const { json } = await request(url, options); // pegando o json, sendo apenas uma mensagem
      console.log(json);
    }
  }

  return (
    <section className='animeLeft'>
      <Head title="Perdeu a senha?" description="Página resetar a senha do site Dogs"/>

      <h1 className="title">Perdeu a senha?</h1>
      {/* exibindo o data caso ele exista, e caso contrário ele exibe o formuláro */}
      {data ? (
        <p style={{color: '#4c1'}}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" type="text" name="login" {...login} />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
        </form>
      )}


      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost;
