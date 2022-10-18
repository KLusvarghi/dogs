import React from 'react'
import styles from './FeedModal.module.css'
import useFetch from '../../Hooks/useFetch'
import { PHOTO_GET } from '../../api'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading'
import PhotoContent from '../Photo/PhotoContent'

// Irá abrir um modal de cada foto especificamente
const FeedModal = ({photo, setModalPhoto}) => { // pegando esse photo apenas para obter o id, a photo queabrirá no modal será a que iremos pegar do fetch da api
  const {data, error, loading, request} = useFetch()

  React.useEffect(() => {
    // retornando a 'url' e as 'options' para em sequencia fazer o fetch com o 'request'. passando apenas o id da photo para o 'PHOTO_GET', para que ele me retornr a url e as option
    const {url, options} = PHOTO_GET(photo.id)
    request(url, options) // fazedno o fetch da foto
  }, [photo, request])

  function handleOutsideClick(event){

    // Ambos me retornam posições, porem o currentTarget me retorna apena a div que contem tudo, e o target me retorna o item exato que cliquei. então terá uma logica para quando os dois forem iguais eu seto o modal para false
    // console.log('target ', event.target)
    // console.log('currentTarget ', event.currentTarget)

    if(event.target === event.currentTarget) setModalPhoto(null)
  }


  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {/* {console.log(data)} */}
      {error && <Error error={error}/>}
      {loading && <Loading/>}
      {data && <PhotoContent data={data}/>} 
      {/* passadando o data para o componente 'PhotoContent' que será responsavel por abrir determinada foto baseado no click ou no id passado pela url*/}
    </div >
  )
}

export default FeedModal
