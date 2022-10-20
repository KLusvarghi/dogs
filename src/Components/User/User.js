import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Feed from '../Feed/Feed'
import UserHeader from './UserHeader'
import UserPhotoPost from './UserPhotoPost'
import UserStats from './UserStats'
import UserContext from '../../UserContext'
import NotFound from '../NotFound'


const Usuário = () => {

  const {data} = React.useContext(UserContext) 
  // console.log(data.id) // me retornando o id do usuário

  return (
    <section className='container'>
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id}/>}/>
        <Route path="postar" element={<UserPhotoPost/>}/>
        <Route path="estatisticas" element={<UserStats/>}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </section>
  )
}

export default Usuário