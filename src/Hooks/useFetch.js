import React from 'react';

// como o site utiliza o fetch da mesma maneira diversas vezes, foi criado esse hook para facilitar o trabalho

const useFetch = () => {
  // tendo no fetch o 'data' que segura os dados
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // criando uma função de request, criando ela dentro de um callback para que ela não seja recriada toda vez que a gente utilizar o useFetch

  // essa função é uma função padrão para que seja reutilizada por todo o projeto, apenas fazendo o fetch para a determinada url que passar, apenas precisando a url em si e as options que devem ser passadas por parametro na hora de chamar essa função
  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (response.ok === false) throw new Error(json.message);
    } catch (err) {
      json = null; // passando null para que na hora de setar o data, o processo não seja demorado passando json do fetch sendo que o 'response.ok' é false
      setError(err.message);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []); // passando uma array vazia por que não há dependencias

  return {
    data,
    error,
    loading,
    request,
  };
};

export default useFetch;
