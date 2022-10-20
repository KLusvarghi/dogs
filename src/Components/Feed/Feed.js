import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';

// Sendo aqui onde irá aparece na aba 'conta' os posts especificos que o priprio usuário passou, ou entrando no perfil de outros usuários e conte4ndo apenas os posts dele(a)

const Feed = ({ user }) => {
  // recebendo o id usuário especifico e passando para o feedPhotos

  const [modalPhoto, setModalPhoto] = React.useState(null);

  // Sendo esse valor reativo 'pages' o que irá fazer aparecer imagnes no feed
  const [pages, setPages] = React.useState([1]);

  // sendo esse estado que ira dizer se ele deve ou não continuar puxando os valores
  const [infinite, setInfinite] = React.useState(true);

  // o 'infinite' só receberá false quando verificarmos que a array de paginas for menor que 3, por que até então é exibido 3 fotos por página, o que significa que se ele for menor que 3, acabou as fotos


  // efeito responsavel o=por fazer o scroll infinito de posts
  React.useEffect(() => {
    let wait = false;
    function infinitScroll() {
      if (infinite) {
        // antes de adicioanr mais uma página, tem que verificar se a pessoa chegou ao fim da página
        const scroll = window.scrollY; // me dadando a posição de onde está minha barra de scroll
        const heigth = document.body.offsetHeight - window.innerHeight; // me retornando o valor total da tela

        // sendo assim, calculando 75% da tela, para quando ele atingir esse valor ele exibir mais fotos, além de verificar se wait é falso
        if (scroll > heigth * 0.75 && !wait) {
          // assim, desestruturando passando os valores que existem da array 'pages' e acrescentando 'pages.length' que é a quantidade de numeros + 1
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;

          // para não ativar siversas vezes seguidas, ele só irá ativar depois de 500 milessesgundos
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }

    // passando o evento de 'wheel' que é quando eu rodo o scroll do mouse mesmo que não tenha scroll na página
    window.addEventListener('wheel', infinitScroll);
    window.addEventListener('scroll', infinitScroll);
    return () => {
      // tendo que sempre limpar o evento
      window.removeEventListener('wheel', infinitScroll);
      window.removeEventListener('scroll', infinitScroll);
    };
  }, [infinite]);



  return (
    <section>
      {/* só exibindo se o modal for diferente de null e passando a foto como parametro */}
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}{' '}
      {/* para que seja possivel fechar o modal, tem que apssar ele como paramentro */}
      {/* porem para pegar a foto, temos terá que ser pelo 'feedPhotos' */}
      {/* fazendo um map que irá adicionar fotos ao feed baseado no 'pages', que é uma array */}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          user={user}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
          /* passando o user para o FeedPhotos por que é lá onde eu faço o fetch das fotos */
        />
      ))}
      {/* mensagem para caso não exist mais postagens e users */}
      {!infinite && !user && (
        <p
          style={{
            textAlign: 'center',
            padding: '2rem 0 4rem 0',
            color: '#888',
          }}
        >
          Não existem mais postagens.
        </p>
      )}
    </section>
  );
};

export default Feed;
