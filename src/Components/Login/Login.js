import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import LoginCreate from './LoginCreate'
import LoginPasswordLost from './LoginPasswordLost'
import LoginPasswordReset from './LoginPasswordReset'
import { UserContext} from '../../UserContext'

const Login = () => {
  // para desativar ou sumir da tela o formulário de login caso já esteja logado, usamos o estado (login) do mu useContext
  const {login} = React.useContext(UserContext)
  // fazedno um direcionamento de rota porem dessa vez não sendo com o useNavigate e sim com um elemento do 
  if(login === true) return <Navigate to="/conta" />
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginForm/>} />
        <Route path='criar' element={<LoginCreate/>} />
        <Route path='perdeu' element={<LoginPasswordLost/>} />
        <Route path='resetar' element={<LoginPasswordReset/>} />
      </Routes>
    </div>
  )
}

export default Login