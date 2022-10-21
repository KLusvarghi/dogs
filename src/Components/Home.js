import React from 'react';
import Feed from './Feed/Feed';
import Head from './Helper/Head'

// aqui na home será onde qualquer um, logado ou não terá acesso as postagens no feed, porém, com limitações diferentes
const Home = () => {
  return <section className='container mainContainer'>
    <Head title="Fotos" description="Home do site Dogs, com o feed de fotos"/>
    <Feed /> 
    {/* como aqui não é passado o user, o user por padrão será '0', assim exibindo os post de todos os User's */}
  </section>;
};

export default Home;
