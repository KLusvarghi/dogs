import React from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../Feed/Feed'


// Component reponsavel por exibir o perfil do usuário
const UserProfile = () => {

  // puxando o parametro do usuário clicado
  const {user} = useParams()

  // passando direto o usuário para o feed, assim quando for mostrar o feed, irá mostrar o feed baseado no conteúdo dousuário que foi capturado pelo parametro da URL
  
  return (
    <section className='container mainSection'>
      <h1 className='title'>{user}</h1>
      <Feed user={user}/>
    </section>
  )
}

export default UserProfile
