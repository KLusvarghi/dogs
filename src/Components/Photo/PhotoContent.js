import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';
import PhotoComents from './PhotoComents';
import styles from './PhotoContent.module.css';
import PhotoDelete from './PhotoDelete';

const PhotoContent = ({ data }) => {
  const { photo, comments } = data; // desestruturando o que vem de data

  // vem qual o usuário logado através do meu contexto
  const user = React.useContext(UserContext);
  // console.log(user.data.username) // me retorna o usuário logado

  return (
    <div className={styles.photo}>
      <div className={styles.img}>
        <img src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {/* Verifica se user.data que é as informações do usuário logado, existir, e se o usuário em expecifico for igual ao autor da foto, ele mostra o botão */}
            {user.data && user.data.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              // caso o usuário não seja o autor, mostra o nome do autor normalmente
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}
            <span className={styles.visualizacoes}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            {/* para caso a pessoa queira abrir apenas a foto */}
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attrubutes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
      </div>
      {/* para eu comentar em uma foto eu preciso saber o id de uma foto, passando ela como parametro, e passando os comentários que vem do 'data' */}
      <PhotoComents id={photo.id} comments={comments} />
    </div>
  );
};

export default PhotoContent;
