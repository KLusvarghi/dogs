import { useState } from 'react'

// tudo que tiver aqui dentro, os componentes reativos como o 'name e password'


const types = {
  email : {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    messege: 'Usename inválido'
  },
  number: {
    // o '^' quer dizer que ele tem que começar com. '\d' quer dizer que tem que ser digito. o '+' quer dizer que pode der um ou mais digitos. '$' quer dizer que tem que terminar com um digito
    regex: /^\d+$/,
    messege: 'Utilize apenas números'
  }
}

const useForm = (type) => { // recebendo o tipo de input
  const [value, setValue] = useState('') // irá conter o valor do input
  const [error, setError] = useState(null) // irá conter os erros

  // função responsavel por validar o input
  function validate(value) { // recebendo  o valor do input
    if(type === false) return true //ele verifica se tem algum tipo de validação, caso não tenha, ele retorna como true e segue a vida
    if(value.length === 0){
      setError('Preencha um valor')
      return null
      // verificando se o tupo de validação existe e testando se o valor do input do determinado tipo passa pelo regex daquele tipo de input, neste caso negando para caso de erro
    }else if(types[type] && !types[type].regex.test(value)) {
      setError(types[type].messege)
      return false // retornando falso por que não passou pela validação
    }else {
      setError(null) // setando o valor do ERROR para null
      return true
    }
  }
  
  function onChange({target}){
    // ele só irá validar o valor casó já tenha acontecido algum error
    if(error) validate(target.value) // assim todas vez que ouver qualquer alteração no valor ele faça uma validação
    setValue(target.value)
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value), // retornando direto um método que já ativa um método.
    // simplificando na hora de chamar ele usando apenas: 'password.validate()'

    // sendo o método que valida após o usuário sair do campo de input
    onBlur: () => validate(value),
  }
}

export default useForm