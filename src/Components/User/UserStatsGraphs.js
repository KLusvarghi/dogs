import React from 'react';
import styles from './UserStatsGraphs.module.css';
// dentro de chaves eu importo omodelo de gráfico que eu quero
import { VictoryPie, VictoryChart, VictoryBar } from 'victory';

const UserStatsGraphs = ({ data }) => {
  const [graph, setGraph] = React.useState([]); // uma reativo para segurar os dados do gráfico
  const [total, setTotal] = React.useState(0); // e esse reativo vai ocnter as vizualizações

  // reativo que irá conter os dados que serão passado para p 'victoryPie'
  /* 
    sendo:
    X o Titulo
    Y o valor
    porem no y não pode ser string e sim apenas numeros
  */
  const graphData = data.map((item) => {
    return {
      x: item.title,
      y: Number(item.acessos), // convertendo os acessos para number para que possa ser passado como no gráfico sem dar error
    };
  });

  React.useEffect(() => {
    // assim passando direto para o estado reativo
    // fazendo um map e desestruturando o data pegando apena os 'acessos', porem ele me retorna em string, tendo que converter
    // depois para somar eu uso o reduce, passando duas variaveis, que serão o numero anterior e o atual e somando eles
    setTotal(
      data
        .map(({ acessos }) => Number(acessos))
        .reduce((prev, next) => prev + next),
    );
    setGraph(graphData);
  }, [data, graphData]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={`${styles.graphItem}`}>
        {/* Utilizado eles como componentes */}
        {/* recebendo um data com uma array, uma array de objetos, como objetos no eixo X e Y */}
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, rigth: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              // Por ser um SVG, temos que falar com o stroke
              stroke: '#fff', // sendo a cor da linha de divisão
              strokeWidth: 2, // sendo a largura da linha de divisão
            },
            labels: {
              fontSize: 16,
              fontWeight: 'bold',
              fill: '#333',
            },
          }}
        />
      </div>
      <div className={`${styles.graphItem}`}>
        <VictoryChart>
          {/* sendo o 'alignment' o alinhamento */}
          <VictoryBar 
            alignment="start" 
            data={graph}
            style={{
              labels: {
                fontWeight: 'bold',
              },
            }}>
            
          </VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraphs;
