import React, { Component, Fragment } from 'react';
import { Card } from 'antd';

import { agruparTransicoesPorEstado } from './index';

export default class AfndToAfd extends Component {

    analisar(formPayload) {
        const transicoes = formPayload.transicoes;
        const simbolos = formPayload.simbolos;
        const estadoInicial = formPayload.estadoInicial;

        var novoState = {};

        transicoes.forEach((transicao, indexTransicao) => {
            simbolos.forEach((simbolo, indexSimbolo) => {
                var novaTransicao = {
                    simbolo: simbolo,
                    resultado: []
                };

                transicao.forEach((transicaoSimbolo, indexTransicaoSimbolo) => {
                    if (transicao.estado === transicaoSimbolo.estado && transicaoSimbolo.simbolo === simbolo) {

                    }
                });



            })
        });
    };

    agruparEstados(transicoes) {
        novasTransicaoes = [];
        transicoes.forEach((transicoes1, index1) => {
            transicoes.forEach((transicoes2, index2) => {
                if (transicoes1.estado === transicoes2.estado
                    && transicoes1.simbolo === transicoes2.simbolo) {
                        



                }

            });
        });
        return novasTransicaoes;
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