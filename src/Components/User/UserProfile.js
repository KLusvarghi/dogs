import React from 'react';
import { useParams } from 'react-router-dom';
import Feed from '../Feed/Feed';
import Head from '../Helper/Head';

// Component reponsavel por exibir o perfil do usuário
const UserProfile = () => {
  // puxando o parametro do usuário clicado
  const { user } = useParams();

  // passando direto o usuário para o feed, assim quando for mostrar o feed, irá mostrar o feed baseado no conteúdo dousuário que foi capturado pelo parametro da URL

  return (
    <section className="container mainSection">
      <Head title={user} description="Pagina da conta do usuário" />
      <h1 className="title">{user}</h1>
      <Feed user={user} />
    </section>
  );
};

export default UserProfile;
