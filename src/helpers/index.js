export const agruparTransicoesPorEstado = (transicoes) => {
  const transicoesPorEstado = {};

  transicoes.forEach(transicao => {
    if (transicoesPorEstado[transicao.estado]) {
      transicoesPorEstado[transicao.estado].push(transicao);
    }
    else {
      transicoesPorEstado[transicao.estado] = [transicao];
    }
  });

  return transicoesPorEstado;
}

export const getTransicoesDoEstadoInicial = (transicoes, estadoInicial) => {
  return transicoes.filter((transicao) => {
    return transicao.estado === estadoInicial;
  });
}