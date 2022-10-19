import React from 'react';
import styles from './FeedPhotosItem.module.css'
import Image from '../Helper/Image'

// Componente que é exibido no feed, mostrando as fotos e as visualizações
const FeedPhotosItem = ({ photo, setModalPhoto}) => {

  function handleClick(){
    setModalPhoto(photo) // passando a 'photo' clicada para 'setModalPhoto'
  }

  return (
    <li className={styles.photo} onClick={handleClick} >
      {' '}
      {/* a imagem será renderizado nesse componente */}
      <Image src={photo.src} alt={photo.title}/>
      <span className={styles.visualizacao}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
