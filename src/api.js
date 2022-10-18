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

// Função para postar foto
export function PHOTO_POST(formData, token) { // recebendo emial, username e senha, que é o body
  return {
    url: API_URL + '/api/photo',
    options: {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token,
      },
      body: formData // passando assim por que por padrão o body entende arquivo do tipo data, e já estamos passando um do tipo Data
    },
  };
}

// querendo puxar a página, total de itens que eu quero pegar e de qual usuário eu quero
export function PHOTOS_GET({page, total, user}) { // recebendo emial, username e senha, que é o body
  return {
    // sendo padronizado isso na Api
    url: `${API_URL}/api/photo?_page=${page}&_total=${total}&_user=${user}`,
    options: {
      method: 'GET',
      cache: 'no-store' // não tendo cache por causa se um usuário postar uma foto nova ela não irá aparecer
    },
  };
}

export function PHOTO_GET(id) { // recebendo apenas o id para abrir a foto
  return {
    // sendo padronizado isso na Api
    url: `${API_URL}/api/photo/${id}`,
    options: {
      method: 'GET',
      cache: 'no-store' // não tendo cache por causa se um usuário postar uma foto nova ela não irá aparecer
    },
  };
}