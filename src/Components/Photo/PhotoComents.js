import React from 'react';
import UserContext from '../../UserContext';
import PhotoComentsForm from './PhotoComentsForm';
import styles from './PhotoComents.module.css';

// aqui será definido a forma que será postado um comentário
const PhotoComents = (props) => {
  // passando um callback que vai rodar só uma vez e vaio definir o estádo inicial
  const [comentarios, setComentarios] = React.useState(() => props.comments); // tendo como valor inicial os comentários

  const { login } = React.useContext(UserContext);
  // desestruturando e pegando a variavel Reativa 'login' que retorna do 'UserCOntext', que é se o usuário está logado ou não

  // para obter o tamanho da seção de comentários, par aao entrar na foto fazer um scroll automático para o ultimo comentário, basta usar o use.Ref()

  const commentsSection = React.useRef(null)

  // efeito que toda vez que adicionar um novo comentário ele irá fazer um scroll para o ultimo comentário do post
  React.useEffect(() => {
    // sendo 'commentsSection.current.scrollTop' para atpe onde irá fazer o scroll, tendo assim que passar o valor do tamanho total de 'commentsSection'
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight
  }, [comentarios]) // toda vezs que os comentários mudar ele adicioanr o efeito

  return (
    <>
      <ul ref={commentsSection} className={styles.comments}>
        {comentarios && comentarios.map((comentario) => (
          <li key={comentario.comment_ID}>
            <b>{comentario.comment_author}: </b> {/* Sendo o nome do autor */}
            <span>{comentario.comment_content}</span>{' '}
            {/* Sendo o conteudo do comentário */}
          </li>
        ))}
      </ul>
      {/* Assim só aparecendo os comentários para usuários logados */}
      {/* passando o estado reativo para o 'photoCommentsForm' */}
      {login && <PhotoComentsForm id={props.id} setComentarios={setComentarios} />} 

      {/* para eu comentar em uma foto eu preciso saber o id de uma foto */}
    </>
  );
};

export default PhotoComents;
