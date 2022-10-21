import React from 'react';
import { useParams } from 'react-router-dom';
import { PHOTO_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent';
import Head from '../Helper/Head'


// sendo esse o componente que irá abrir apenas a foto em uma aba única, tendo que adicioanr essa rota no App.js
const Photo = () => {
  // ao clicar em uma foto ele pega o parametro
  // definido lá em 'PhotoContent' a rota <Link to={`/foto/${photo.id}`}>{photo.title}</Link>, então utilizando o useParams e tendo acesso ao parametro da url :id
  const { id } = useParams(); // desestruturando o que retorna que é apenas o 'id'

  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(id);
    request(url, options);
  }, [request, id]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  // assim renderizando o componente 'PhotoContent'e passando o conteúdo da foto baseado no id que foi feito o fetch por parametro
  if (data)
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} description="Página de foto do site Dogs"/>
        <PhotoContent single={true} data={data} />
      </section>
    );
  else return null;
};

export default Photo;
