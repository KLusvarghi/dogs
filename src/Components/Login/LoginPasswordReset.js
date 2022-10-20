import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_RESET } from '../../api';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router-dom';

// ao clicar no link para resetar a senha ele jogará para a página de resetar com uma key

// sendo o componente repsonsavel por puxar o valor (key) da URL, validar e resetar a senah do usuário
const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const password = useForm();
  const { loading, error, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');

    if (key) setKey(key);
    if (login) setKey(login);
  }, []); // querendo que ocorra apenas uma vez

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.validate()) { // verificando se o password está valido
      const { url, options } = PASSWORD_RESET({
        // para fazer o reset a Api exige as 3 coisas:
        login,
        key,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate('/login'); // verificando se o reponse do fetch está ok e navegando para página de login
    }
  }

  return (
    <div>
      <h1 className="title">Resete a Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input 
          label="Nova senha" 
          type="password" 
          name="password" 
          {...password} 
        />
        {loading ? (
          <Button disable>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Error error={error} />
    </div>
  );
};

export default LoginPasswordReset;
