import React from 'react';
import FeedPhotosItem from './FeedPhotosItem';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../api';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import styles from './FeedPhotos.module.css';

// feed incluindo todas as fotos
const FeedPhotos = ({ page, user, setModalPhoto, setInfinite }) => {
  // puxar os itens e fazer uma fetch
  const { data, loading, error, request } = useFetch();

  // logo que entrar ná página fará um efeitp trazendo todas as fotos
  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 6 // podendo assim escolher a quantidade de fotos renderizadas por página
      const { url, options } = PHOTOS_GET({ page, total, user}); // quando defino 'user: 0' quer dizer que ele pega de qualquer usuário

      // sendo dentro do meu json que tenho a quantidade de fotos existentes na minha Api
      const { response, json } = await request(url, options); // sendo o request me retornando o response e o json
      // console.log(response); // me diz se está ok
      // console.log(json); // me retoran as informações da foto

      // assim verificando se o response está certo, que dizer que ao fetch deu certo e verificando se o json é menor que total, que quer dizer que acabou a quantidade de fotos para ser renderizada
      // console.log('Requet of photos: ', json)
      if (response && response.ok && json.length < total) setInfinite(false);
      
    }
    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {/* pecorrendo o 'data', e para cada foto ele irá chamar o 'feedPhotosItem' passando a foto */}
        {data.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto} // passando o 'setModalPhoto' como propriedade, tendo que ir lá no 'FeedPhotosItem' e lidar com essa mudança
          />
        ))}
      </ul>
    );
  else return null; // ele pede que coloque um else para caso não tenha nenhuma das condições acima
};

export default FeedPhotos;
