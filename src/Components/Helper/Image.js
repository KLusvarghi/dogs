import React from 'react'
import styles from './Image.module.css'

// Sendo esse componente um esqueleto que é exibido antes de exibir as imagens, para que ao carrgar a tela não exiba a imagem cortada e depois ela inteira
const Image = ({alt, ...props}) => {
  const [skeleton, setSkeleton] = React.useState(true)

  // essa função só ocorrendo quando a imagem for carregada 100%
  function handleLoad({target}){
    setSkeleton(false)

    // quando ela for carregada ela mudará a opacidade para 1
    target.style.opacity = 1
  }

  return (
    <div className={styles.wrapper}>
      {/* quando o skele */}
      {skeleton && <div className={styles.skeleton}></div> }
      
      {/* passando o alt dessa maneirt ainvés de passar tudo no propos por que o eslint fica me dando o erro se passo tudo direto em ...props */}
      {/* o evento 'onLoad' ocorre toda vez que a imagem é carregada 100% */}
      <img onLoad={handleLoad} className={styles.img} alt={alt} {...props} />
    </div>
  )
}

export default Image
