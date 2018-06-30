import React, { Component, Fragment } from 'react';
import { Card } from 'antd';

export default class VerificadorAfnAfnd extends Component {

  analisar(formPayload) {
		if (formPayload.transicoes) {
			const transicoesPorEstado = this.agruparTransicoesPorEstado(formPayload.transicoes);
			const resultados = this.agruparResultados(transicoesPorEstado);

			for (var key in resultados) {
				if (this.hasDuplicates(resultados[key])) {
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
				resultadosDasTransicoes.push(transicao.resultado)
			});

			resultados[key] = resultadosDasTransicoes;
		}

		return resultados;
	}

	agruparTransicoesPorEstado(transicoes) {
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

	/**
	 * Verifica se possui valores duplicados no array
	 *
	 * @param {array} array
	 * @return {boolean}
	 */
	hasDuplicates(array) {
    var valuesSoFar = [];
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (valuesSoFar.indexOf(value) !== -1) {
            return true;
        }
        valuesSoFar.push(value);
    }
    return false;
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