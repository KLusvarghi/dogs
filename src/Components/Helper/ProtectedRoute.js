import React from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../../UserContext'

// Será apenas um componete para verificar se o login foi executado para que seja possivel o usuário ir para a roda determinada


// Acessando o componente a ser renderizado caso o login der true através do children. Que dentro do props eu tenho o children que é uma prorpiedade que tem sempre qualuqer elemente que está dentro do elemento que eu abro e fecho ele, que no caso é o 'ProtectedRoute'
const ProtectedRoute = ({children}) => {
  // Querendo pegar apenas o 'login' que retorna true ou false dependendo se o usuario estiver logado ou não
  const { login } = React.useContext(UserContext)
  
  // caso login sejá verdadeiro ele retorna algo, caso não ele navega para login
  return login ? children : <Navigate to="/login" />
}

export default ProtectedRoute
