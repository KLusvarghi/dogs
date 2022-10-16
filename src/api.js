export const API_URL = 'https://dogsapi.origamid.dev/json';

// essa é a url para fazer ogin, que na verdade estará puxando o token do usuário para autenticação
// https://dogsapi.origamid.dev/json/jwt-auth/v1/token


// função responsavel por gerar um token
export function TOKEN_POST(body) {
  return {
    url: API_URL + '/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

// função responsavel por validar o token quando já tiver um token em localStorage
export function TOKEN_VALIDATE_POST(token) {
  return {
    url: API_URL + '/jwt-auth/v1/token/validate',
    options: {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token,
      },
    },
  };
}

// função para pegar usuário
export function USER_GET(token) {
  return {
    url: API_URL + '/api/user',
    options: {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token,
      },
    },
  };
}


// função para cadastrar / postar usuário
export function USER_POST(body) { // recebendo emial, username e senha, que é o body
  return {
    url: API_URL + '/api/user',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    },
  };
}
