import React from 'react';
import UserContext from '../../UserContext';
import PhotoComentsForm from './PhotoComentsForm';
import styles from './PhotoComents.module.css';

// aqui será definido a forma que será postado um comentário
const PhotoComents = (props) => {
  // como já está em props, tendo acesso ao sigle tambem
  // passando um callback que vai rodar só uma vez e vaio definir o estádo inicial
  const [comments, setComments] = React.useState(() => props.comments); // tendo como valor inicial os comentários


  // para obter o tamanho da seção de comentários, par aao entrar na foto fazer um scroll automático para o ultimo comentário, basta usar o use.Ref()

  const commentsSection = React.useRef(null);


  // desestruturando e pegando a variavel Reativa 'login' que retorna do 'UserCOntext', que é se o usuário está logado ou não
  const { login } = React.useContext(UserContext);


  // efeito que toda vez que adicionar um novo comentário ele irá fazer um scroll para o ultimo comentário do post
  React.useEffect(() => {
    // sendo 'commentsSection.current.scrollTop' para atpe onde irá fazer o scroll, tendo assim que passar o valor do tamanho total de 'commentsSection'
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]); // toda vezs que os comentários mudar ele adicioanr o efeito

  return (
    <>
      {/* fanzendo a mesma verificação para o estilo de single que foi feita em "PhotoContent" */}
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${props.single ? styles.single : ''}`}
      >
        {comments.map((comment) => (
            <li key={comment.comment_ID}>
              <b>{comment.comment_author}: </b> {/* Sendo o nome do autor */}
              <span>{comment.comment_content}</span>
              {/* Sendo o conteudo do comentário */}
            </li>
          ))}
      </ul>
      {/* Assim só aparecendo os comentários para usuários logados */}
      {/* passando o estado reativo para o 'photoCommentsForm' */}
      {login && (
        <PhotoComentsForm
          single={props.single}
          id={props.id}
          setComments={setComments}
        />
      )}
      {/* para eu comentar em uma foto eu preciso saber o id de uma foto */}
    </>
  );
};

export default PhotoComents;
