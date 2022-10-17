import React from 'react'

// Sendo um hook que irá capturar o tamnho da tela do usuário de forma reativa
const useMedia = (media) => {
  const [match, setMatch] = React.useState(null) // o match nos retorna um valor true ou false

  React.useEffect(() => {
    function changeMatch() {
      // sendo 'matchMedia' um método para verificar o tamanho da tela baseado em um media Query @
      const {matches} = window.matchMedia(media)
      setMatch(matches)
    }
    changeMatch() // toda vez que eu dou reload ele não estava reconhecendo o menu mobile, tendo que ativar pelo menos uma vez quando ele faz reload, por que por padrão ele executa essa função 1 vez quando se abre o site

    
    window.addEventListener('resize', changeMatch) // adicioanndo um evento toda vez que acontecer um reload na tela

    // sempre limpando esse evento caso ele saia da tela
    return () =>{
      window.removeEventListener('resize', changeMatch)
    }
  }, [media])
  return match
}

export default useMedia
