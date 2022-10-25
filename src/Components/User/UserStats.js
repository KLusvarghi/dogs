import React from 'react'
import Head from '../Helper/Head'
import useFetch from '../../Hooks/useFetch'
import { STATS_GET } from '../../api'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading'

const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'))

// sendo esse o componente que faz a busca dos dados para que o componente 'UserStatsGraphs' exiba os dados buscados
const UserStats = () => {

  const {data, error, loading, request} = useFetch()

  React.useEffect(() => {
    async function getData(){
      const { url, options } = STATS_GET();
      await request(url, options)
    }
    getData()
  }, [request])

  if(loading) return <Loading />
  if(error) return <Error error={error}/>
  if(data)
  return (
    // colocando o componente que só será carregado quando dentro do 'suspense' e podendo passar o laoding dentro do fallback ou deixar do jeito que estava e passar uma div vazia
    <React.Suspense fallback={<div></div>}>
      <Head title="Estatística" description="Página de estatística do site Dogs"/>
      <UserStatsGraphs data={data} /> {/* passando o data que vai ser o que eu irei manipular */}
    </React.Suspense>
  )
  else return null // sempre tendo que retornar null caso não tenha data
}

export default UserStats