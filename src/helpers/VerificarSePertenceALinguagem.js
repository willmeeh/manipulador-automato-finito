import React, { Component, Fragment } from 'react';
import { Card, Row, Col, Input, Icon, Tag } from 'antd';
import _ from 'lodash';

import { agruparTransicoesPorEstado } from './index';

const { Search } = Input;

export default class VerificadorAfnAfnd extends Component {

  state = {
    simbolosASeremTestados: ['0', '0', '1'],
    simbolo: ''
  }

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

    this.state.simbolosASeremTestados.forEach((simbolo) => {

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

  	//Simbolos
	addSimbolo = (s) => {
    console.log('s', s)
		if (s) {
      this.setState({
        simbolosASeremTestados: [...this.state.simbolosASeremTestados, s]
      });
		}
		this.setState({
			simbolo: ''
		});
	}

  simboloOnChange = (e) => {
		e.preventDefault();
		const value = e.target.value;
		if (!_.includes(this.props.formPayload.estados, value)) {
			this.setState({
				simbolo: value.charAt(value.length - 1)
			});
		}
  }

  delSimbolo = (index) => {
		let newList = this.state.simbolosASeremTestados;
		let s = newList.splice(index, 1);
		this.setState({
			simbolosASeremTestados: newList,
			simbolo: s
		});
	}

	render() {
		const cardStyle = {
			textAlign: 'center',
		};
		return (
			<Fragment>
        <Card style={cardStyle}>
          <h2>Verificar se sepertence a linguagem:</h2>
          <Card
            className="text-left"
            title={<b>Simbolos: </b>}
            extra={
              <Fragment>
                <Search
                  prefix={<Icon type="tag-o" />}
                  placeholder="Simbolo"
                  enterButton="Add"
                  value={this.state.simbolo}
                  onChange={this.simboloOnChange}
                  onSearch={this.addSimbolo} />
              </Fragment>
            }
          >
            <Row>
              <Col md={24} className="text-center">
                {this.state.simbolosASeremTestados.map((nt, index) =>
                  <Tag
                    key={index}
                    color="red"
                    onClick={() => this.delSimbolo(index)}
                    name={index}>
                    {nt}
                  </Tag>)}
              </Col>
            </Row>
          </Card>
          <Card style={cardStyle}>
            <h1>{this.exibirTransicoes(this.props.formPayload)}</h1>
            <h1>{this.exibirAceitaOuRejeita(this.props.formPayload)}</h1>
          </Card>
				</Card>
			</Fragment>
		);
	}
}