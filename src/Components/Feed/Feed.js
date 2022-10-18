import React from 'react'
import FeedModal from './FeedModal'
import FeedPhotos from './FeedPhotos'

const Feed = () => {
  const [modalPhoto, setModalPhoto] = React.useState(null)
  return (
    <section>
      {/* só exibindo se o modal for diferente de null e passando a foto como parametro */}
      {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto}/>} {/* para que seja possivel fechar o modal, tem que apssar ele como paramentro */}
      
      {/* porem para pegar a foto, temos terá que ser pelo 'feedPhotos' */}
      <FeedPhotos setModalPhoto={setModalPhoto}/>
    </section>
  )
}

export default Feed