import React, { Component, Fragment } from 'react';
import { Card } from 'antd';
import _ from 'lodash';

import { agruparTransicoesPorEstado } from './index';

export default class VerificadorAfnAfnd extends Component {

  analisar(formPayload) {
		if (formPayload.transicoes) {
			const transicoesPorEstado = agruparTransicoesPorEstado(formPayload.transicoes);
			const resultados = this.agruparResultados(transicoesPorEstado);
			for (var key in resultados) {
				if (this.hasDuplicates(resultados[key], key)) {
					return 'Autômato finito não determinístico (AFND)';
				}
			}

			return 'Autômato finito determinístico (AFD)';
		}
	};

	agruparResultados(transicoesPorEstado) {
		const resultados = {};
		for (var key in transicoesPorEstado) {

			const resultadosDasTransicoes = [];

			transicoesPorEstado[key].forEach((transicao) => {
				resultadosDasTransicoes.push(transicao)
			});

			resultados[key] = resultadosDasTransicoes;
		}
		return resultados;
	}

	/**
	 * Verifica se possui valores duplicados no array
	 *
	 * @param {array} array
	 * @return {boolean}
	 */
	hasDuplicates(array) {
		const arrayUniq = _.uniqWith(array, _.isEqual);
		return arrayUniq.length !== array.length;
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