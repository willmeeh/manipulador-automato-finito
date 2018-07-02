import React, { Component, Fragment } from 'react';
import { Card } from 'antd';

import { getTransicoesDoEstadoInicial } from './index';

export default class VerificadorAfnAfnd extends Component {

  analisar(formPayload) {
		if (formPayload.transicoes) {
      const estados = this.removerEstadosInacessiveis(formPayload);
      console.log('estados', estados);
		}
	};

	removerEstadosInacessiveis({transicoes, estadoInicial}) {

    const transicoesDoEstadoInicial = getTransicoesDoEstadoInicial(transicoes, estadoInicial);
    const transicoesFiltradas = transicoesDoEstadoInicial;

    transicoes.forEach((transicao) => {
      const estadoPossuiAcesso = this.verificarSeEstadoPossuiAcesso(
        transicoes,
        transicao.estado,
        transicoesFiltradas
      );

      if (estadoPossuiAcesso) {
        transicoesFiltradas.push(transicao);
      }
    });

    return transicoesFiltradas;
  }

  verificarSeEstadoPossuiAcesso(transicoes, estado, transicoesFiltradas) {
    let possuiAcesso = false;

    transicoes.forEach((transicao) => {

      // Desconsidera os estados que se auto relacionam
      if (transicao.estado !== estado) {
        if (transicao.resultado === estado) {
          possuiAcesso = true;
        }
      }
    });
    return possuiAcesso;
  }

	render() {
		const cardStyle = {
			textAlign: 'center',
		};
		return (
			<Fragment>
				<Card style={cardStyle}>
					<h1>{this.analisar(this.props.formPayload)}</h1>
				</Card>
			</Fragment>
		);
	}
}