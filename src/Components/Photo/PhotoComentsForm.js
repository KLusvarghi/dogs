import React from 'react';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import useFetch from '../../Hooks/useFetch'
import { COMMENT_POST } from '../../api';
import Error from '../Helper/Error'
import styles from './PhotoComentsForm.module.css'

const PhotoComentsForm = ({ id, setComentarios}) => {
  const [comment, setComment] = React.useState('');

  // ao enviar o formulário terá que fazer um fetch, assim, chamando o nosso hook 'useFetch'
  const {request, error } = useFetch()

  async function handleSubmit(event){
    event.preventDefault()


    // puxando a url e options para passar para o request
    // passando o id e o comentario como objeto
    const {url, options} = COMMENT_POST(id, {comment})
    // se eu tenho request, eu tenho que definir lá na minha api
    // sendo dentro do 'json' que tem o novo comentário
    const {response, json} = await request(url, options)
    // se o response.ok for true, quer dizer que ele conseguiu postaqr o comentário
    // console.log(json)
    if(response.ok){
      // passando um callback para ter acesso aos comentários anteriores
      // assim passando dentro de um array os comentários anteriores mais os novos
      setComment('') // limpando o setComent para que não tenha nada no textarea para ser digitado
      setComentarios((comments) => [...comments, json ])
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
      className={styles.textarea}
        value={comment}
        // atribuindo o que o usuário comentar ao 'setComment'
        onChange={({ target }) => setComment(target.value)}
        name="comment"
        id="comment"
        placeholder='Comente...'
      />
      <button className={styles.btn}>
        <Enviar/>
      </button>
      <Error error={error}/>
    </form>
  );
};

export default PhotoComentsForm;
