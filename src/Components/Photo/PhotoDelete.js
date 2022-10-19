import React from 'react';
import styles from './PhotoDelete.module.css';
import { PHOTO_DELETE } from '../../api';
import useFetch from '../../Hooks/useFetch';

// retornará um botão de deletar, recebendo apenas o id da foto
const PhotoDelete = ({ id }) => {
  // para eu deletar uma foto, tenho que fazer o fetch para minha api

  // pegando apenas o loadingd e a função de request
  const { loading, request } = useFetch();

  async function handleClick() {
    // fazendo uma verificação para ver se o usuário tem certeza
    const confirm = window.confirm('Tem certeza que deseja deletar? ');
    if (confirm) {
      // pegando a url e options e epassando o id
      const { url, options } = PHOTO_DELETE(id);
      // pegando apenas o response do request, tendo que passar a url e options, após fazer isso ele já irá excluir a foto
      const { response } = await request(url, options);
      // verificando se o response.ok for true e ver se deu certo, assim fazendo um reload da página
      if (response.ok) window.location.reload();
    } else return null;
  }

  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          Deletando...
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
