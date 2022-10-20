import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';
import PhotoComents from './PhotoComents';
import styles from './PhotoContent.module.css';
import PhotoDelete from './PhotoDelete';
import Image from '../Helper/Image'

// recebendo por parametro 'sigle' que será para quando fro abrir a foto não no modal, e sim em umá página unica, passando uma estilziação diferente
const PhotoContent = ({ data, single}) => {
  const { photo, comments } = data; // desestruturando o que vem de data

  // vem qual o usuário logado através do meu contexto
  const user = React.useContext(UserContext);
  // console.log(user.data.username) // me retorna o usuário logado

  return (
    // fazendo essa verificação "sigle ? styles.sigle : ''" por que se eu faço a verificação com "&&" ele adiciona uma classe 'undefined'
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      <div className={styles.img}>
        {/* a imagem será renderizado nesse componente */}
        <Image src={photo.src} alt={photo.title}/>
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
      <PhotoComents single={single} id={photo.id} comments={comments} />
    </div>
  );
};

export default PhotoContent;
