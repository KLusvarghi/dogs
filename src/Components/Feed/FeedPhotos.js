import React from 'react';
import FeedPhotosItem from './FeedPhotosItem';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../api';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import styles from './FeedPhotos.module.css'

// feed incluindo todas as fotos
const FeedPhotos = () => {
  // puxar os itens e fazer uma fetch
  const { data, loading, error, request } = useFetch();

  // logo que entrar ná página fará um efeitp trazendo todas as fotos
  React.useEffect(() => {
    async function fetchPhotos() {
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 }); // quando defino 'user: 0' quer dizer que ele pega de qualquer usuário
      const { response, json } = await request(url, options); // sendo o request me retornando o response e o json
      // console.log(response); // me diz se está ok
      // console.log(json); // me retoran as informações da foto
    }
    fetchPhotos();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {/* pecorrendo o 'data', e para cada foto ele irá chamar o 'feedPhotosItem' passando a foto */}
        {data.map((photo) => (
          <FeedPhotosItem key={photo.id} photo={photo} />
        ))}
      </ul>
    );
  else return null; // ele pede que coloque um else para caso não tenha nenhuma das condições acima
};

export default FeedPhotos;
