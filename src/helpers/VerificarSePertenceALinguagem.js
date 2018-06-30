import React, { Component, Fragment } from 'react';
import { Card } from 'antd';

import { agruparTransicoesPorEstado } from './index';

const simbolosASeremTestados = ['0', '0', '1'];

export default class VerificadorAfnAfnd extends Component {

  analisar(formPayload) {
		if (formPayload.transicoes) {

      let estadoAtual = formPayload.estadoInicial;
      const transicoes = [];

      const transicoesPorEstado = agruparTransicoesPorEstado(formPayload.transicoes);
      simbolosASeremTestados.forEach((simbolo) => {

        const possiveisCaminhos = transicoesPorEstado[estadoAtual]

        let encontrouCaminho = false;
        possiveisCaminhos.forEach((caminho)=> {
          if (caminho.simbolo === simbolo) {
            transicoes.push(caminho);
            encontrouCaminho = true;
            estadoAtual = caminho.resultado;
          }
        });

        if (!encontrouCaminho) {
          return {
            transicoes,
            pertenceALinguagem: false
          }
        }
      });

      console.log({
        transicoes,
        pertenceALinguagem: true
      });

      this.simplificarTransicoes(transicoes);
		}
  };

  simplificarTransicoes(transicoes) {
    const transicoesSimplificadas = [];
    transicoes.forEach((transicao, index) => {
      if (index === 0) {
        transicoesSimplificadas.push(transicao.estado);
      } else {
        transicoesSimplificadas.push(transicao.resultado);
      }
    });

    console.log('transicoesSimplificadas', transicoesSimplificadas);
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