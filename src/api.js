export const API_URL = 'https://dogsapi.origamid.dev/json';

// essa é a url para fazer ogin, que na verdade estará puxando o token do usuário para autenticação
// https://dogsapi.origamid.dev/json/jwt-auth/v1/token

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
