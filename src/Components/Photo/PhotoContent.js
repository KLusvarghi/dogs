import React from 'react';
import { Link } from 'react-router-dom';
import PhotoComents from './PhotoComents';
import styles from './PhotoContent.module.css';

const PhotoContent = ({ data }) => {
  const { photo, coments } = data; // desestruturando o que vem de data

  
  return (
    <div className={styles.photo}>
      <div className={styles.img}>
        <img src={photo.src} alt={photo.title} />
      </div>
        <div className={styles.details}>
          <div>
            <p className={styles.author}>
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
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
        <PhotoComents id={photo.id}  />
    </div>
  );
};

export default PhotoContent;