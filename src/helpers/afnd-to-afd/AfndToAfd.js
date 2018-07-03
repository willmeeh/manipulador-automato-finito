import React, { Component, Fragment } from 'react';
import { Card, Button } from 'antd';
import _ from 'lodash';

export default class AfndToAfd extends Component {

    constructor() {
        super();
        this.handleOnClickTransformar = this.handleOnClickTransformar.bind(this)
    }

    analisar() {
        const { formPayload } = this.props;
        if (formPayload.transicoes) {

            const estadosFinais = formPayload.estadosFinais;
            const simbolos = formPayload.simbolos;
            const transicoes = this.estadoParaLista(this.agruparEstados(formPayload.transicoes));

            let novoEstado = undefined;

            var max = 0;

            while (((novoEstado = this.proximoEstado(transicoes)) !== undefined) && max < 2) {
                max++;

                simbolos.forEach((novoSimbolo) => {
                    novoSimbolo = novoSimbolo + '';
                    let resultados = [];

                    novoEstado.forEach((estado) => {
                        transicoes.forEach((trasicao) => {
                            if (trasicao.estado.length === 1) {
                                let simboloNum = trasicao.simbolo + '';
                                if (_.includes(trasicao.estado, estado)) {
                                    if (simboloNum === novoSimbolo) {
                                        resultados = _.merge(resultados, trasicao.resultado);
                                    }
                                }
                            }
                        });
                    });

                    if (resultados.length > 0) {
                        let novoElemento = {
                            estado: novoEstado,
                            simbolo: novoSimbolo,
                            resultado: resultados
                        };

                        transicoes.push(novoElemento);
                    }

                });
            }

            let trasicoes = this.joinDoWill(transicoes)
            let novosEstadosFinais = [];
            estadosFinais.forEach((estadoFinal) => {
                trasicoes.forEach((trasicao) => {
                    if (trasicao.estado.includes(estadoFinal)) {
                        if (!_.includes(novosEstadosFinais, trasicao.estado)) {
                            novosEstadosFinais.push(trasicao.estado);
                        }
                    }
                });
            });

            return {
                simbolos: formPayload.simbolos,
                estados: formPayload.estados,
                trasicoes: trasicoes,
                estadoInicial: formPayload.estadoInicial,
		        estadosFinais: novosEstadosFinais,
            }
        }
    };

    joinDoWill(transicoes) {
        return transicoes.map((transicao) => {
            transicao.resultado = transicao.resultado.join('');
            transicao.estado = transicao.estado.join('');
            return transicao;
        });
    }

    proximoEstado(transicoes) {
        let estado = undefined;
        transicoes.forEach((transicao, indexTransicao) => {
            if (transicao.resultado.length > 1) {
                if (!this.contemEstado(transicoes, transicao.resultado)) {
                    estado = transicao.resultado;
                }
            }
        });

        return estado;
    }

    contemEstado(transicoes, estado) {
        let possui = false;
        transicoes.forEach((transicao) => {
            if (_.isEqual(transicao.estado.sort(), estado.sort())) {
                possui = true;
            }
        });
        return possui;
    }


    transicaoInicial(transicoes, estadoInicial) {
        return _.uniqBy(transicoes, estadoInicial);
    }

    //Transformações
    estadoParaLista(transicoes) {
        let novasTransicaoes = [];
        transicoes.forEach((transicao) => {
            let novaTransicao = {
                estado: [transicao.estado],
                simbolo: transicao.simbolo,
                resultado: transicao.resultado
            }
            novasTransicaoes.push(novaTransicao);
        });
        return novasTransicaoes;
    }

    agruparEstados(transicoes) {
        let novasTransicaoes = [];
        transicoes.forEach((transicoes1, index1) => {
            transicoes.forEach((transicoes2, index2) => {
                if (transicoes1.estado === transicoes2.estado
                    && transicoes1.simbolo === transicoes2.simbolo) {

                    let estado = transicoes1.estado;
                    let simbolo = transicoes1.simbolo;
                    let index = this.possuiTransicao(estado, simbolo, novasTransicaoes);
                    if (index > -1) {
                        if (!_.includes(novasTransicaoes[index].resultado, transicoes1.resultado)) {
                            novasTransicaoes[index].resultado.push(transicoes1.resultado);
                        }
                    } else {
                        let novaTransicao = {
                            estado: transicoes1.estado,
                            simbolo: transicoes1.simbolo,
                            resultado: []
                        }
                        novaTransicao.resultado.push(transicoes1.resultado);
                        novasTransicaoes.push(novaTransicao);
                    }

                }
            });
        });
        return novasTransicaoes;
    }

    possuiTransicao(estado, simbolo, novasTransicaoes) {
        let indexRetorno = -1;
        if (novasTransicaoes) {
            novasTransicaoes.forEach((transicao, index) => {
                if (estado === transicao.estado && simbolo === transicao.simbolo) {
                    indexRetorno = index;
                }
            });
        }
        return indexRetorno;
    }

    handleOnClickTransformar() {
        const novoEstado = this.analisar();
        this.props.onAfndToAfd(novoEstado);
    }

    render() {
        const cardStyle = {
            textAlign: 'center',
        };
        return (
            <Fragment>
                <Card style={cardStyle}>
                    <Button
                        type="primary"
                        onClick={this.handleOnClickTransformar}
                    >
                        Transformar AFND para AFD
                    </Button>
                </Card>
            </Fragment>
        );
    }

}