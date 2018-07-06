import React, { Component, Fragment } from 'react';
import { Card } from 'antd';
import _ from 'lodash';

import { agruparTransicoesPorEstado } from './index';

export default class VerificadorAfnAfnd extends Component {


	analisar(formPayload) {
		if (formPayload && formPayload.transicoes) {
			console.log(formPayload.transicoes);
			let transicoesPorEstado = _.map(formPayload.transicoes, _.clone);

			transicoesPorEstado.forEach((transicao) => {
				delete transicao.resultado;
			});

			let trasicoesUnicas = _.uniqWith(transicoesPorEstado, _.isEqual);
			console.log(transicoesPorEstado.length, trasicoesUnicas.length);

			if (transicoesPorEstado.length !== trasicoesUnicas.length) {
				return 'Autômato finito não determinístico (AFND)';
			} else {
				return 'Autômato finito determinístico (AFD)';
			}
		}
		return '';
	}

	uniq = (arrArg) => {
		return arrArg.filter((elem, pos, arr) => {
			return arr.indexOf(elem) == pos;
		});
	}


	analisar2(formPayload) {
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