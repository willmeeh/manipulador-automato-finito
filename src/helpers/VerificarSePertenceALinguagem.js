import React, { Component, Fragment } from 'react';
import { Card } from 'antd';

import { agruparTransicoesPorEstado } from './index';

// @TODO Trocar para variávei recebida pelo formulário
const SIMBOLOS_A_SEREM_TESTADOS = ['0', '0', '1'];

export default class VerificadorAfnAfnd extends Component {

  verificarSePertenceALinguagem(formPayload) {
		if (formPayload.transicoes) {
      const testeTransicao = this.testarSimbolos(formPayload);
      return testeTransicao.pertenceALinguagem;
    }
  };

  exibirAceitaOuRejeita(formPayload) {
    const pertenceALinguagem = this.verificarSePertenceALinguagem(formPayload);
    return pertenceALinguagem ? 'Aceita' : 'Rejeita'
  }

  exibirTransicoes(formPayload) {
    if (formPayload.transicoes) {
      const transicoesGeradas = this.testarSimbolos(formPayload).transicoes;
      const transicoesSimplificadas = this.simplificarTransicoes(transicoesGeradas);
      return transicoesSimplificadas.join(' -> ');
    }
  }

  testarSimbolos(formPayload) {
    let estadoAtual = formPayload.estadoInicial;
    const transicoes = [];
    const transicoesPorEstado = agruparTransicoesPorEstado(formPayload.transicoes);

    SIMBOLOS_A_SEREM_TESTADOS.forEach((simbolo) => {

      const possiveisCaminhos = transicoesPorEstado[estadoAtual];

      let encontrouCaminho = false;
      possiveisCaminhos.forEach((caminho)=> {
        if (caminho.simbolo === simbolo) {
          transicoes.push(caminho);
          encontrouCaminho = true;
          estadoAtual = caminho.resultado;
        }
      });

      if (!encontrouCaminho) {
        console.log('não encontrou o caminho');
        return {
          transicoes,
          pertenceALinguagem: false
        };
      }
    });

    console.log({
      transicoes,
      pertenceALinguagem: true
    });

    return {
      transicoes,
      pertenceALinguagem: true
    };
  }

  simplificarTransicoes(transicoes) {
    const transicoesSimplificadas = [];
    transicoes.forEach((transicao, index) => {
      if (index === 0) {
        transicoesSimplificadas.push(transicao.estado);
        transicoesSimplificadas.push(transicao.resultado);
      } else {
        transicoesSimplificadas.push(transicao.resultado);
      }
    });

    console.log('transicoesSimplificadas', transicoesSimplificadas);
    return transicoesSimplificadas;
  }

	render() {
		const cardStyle = {
			textAlign: 'center',
		};
		return (
			<Fragment>
				<Card style={cardStyle}>
					<h1>{this.exibirTransicoes(this.props.formPayload)}</h1>
          <h1>{this.exibirAceitaOuRejeita(this.props.formPayload)}</h1>
				</Card>
			</Fragment>
		);
	}
}