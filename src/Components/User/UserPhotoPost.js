import React from 'react';
import styles from './UserPhotoPost.module.css';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_POST } from '../../api';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router-dom';
import Head from '../Helper/Head'


const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [img, setImg] = React.useState({});

  const { data, error, loading, request } = useFetch();

  const navigate = useNavigate(); // chamando o navigate

  React.useEffect(() => {
    if (data) return navigate('/conta'); // tendo que verificar se o data realmente existe, por que as vezes o data muda mas muda para null quando da erro
  }, [data, navigate]); // toda vez que o data mudar, quer dizer que uma postagem foi feita

  function handleSubmit(event) {
    event.preventDefault();
    // tendo que enviar todos os itens (nome, peso, idade e arquivo) tudo dentro de um form Data juntos, assim criando uma variavl do tipo formData
    const formData = new FormData();
    // podendo adiconar dentro do form data usando o 'append'
    formData.append('img', img.raw); // passando a chave e o cnteúdo em seguida
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token'); // pegando o token
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  }

  function handleImgChange({ target }) {
    //desestuturando o event
    setImg({
      // O 'target.files[0]' não é uma url, não dando para ler, porem podemos usar uma função JS para tranformar em URL
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0], // sendo isso aqui o que realmente iremos enviar para o formulário
    });
  }
  
  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" description="Página para postar sua foto no site Dogs"/>

      <form onSubmit={handleSubmit}>
        <Input label="nome" type="text" name="nome" {...nome} />
        {/* para que de certo e não de erro '422' que é de dados incompletos, tem que desestruturar o restante das props */}
        <Input label="peso" type="text" name="peso" {...peso} />
        <Input label="idade" type="text" name="idade" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />{' '}
        {/* passando o erro no Componente de erro criado em 'helper' */}
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${img.preview})` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
