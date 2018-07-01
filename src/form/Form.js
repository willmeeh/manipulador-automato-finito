import React, { Component, Fragment } from 'react';
import { Form, Card, Row, Col, Input, Icon, Tag, Select, Button } from 'antd';
import _ from 'lodash';
import update from 'immutability-helper';

const FormItem = Form.Item;
const { Search } = Input;
const Option = Select.Option;

class InputForm extends Component {

	state = {
		simbolos: ['0', '1'],
		estados: ['q0', 'q1', 'q2', 'q'],
		estadoInicial: 'q0',
		estadosFinais: ['q2'],
		transicoes: [
			{ // (q0,0) = q2
				estado: 'q0',
				simbolo: '0',
				resultado: 'q2'
			},
			{ // (q0,1) = q0
				estado: 'q0',
				simbolo: '1',
				resultado: 'q0'
			},
			{ // (q1,0) = q1
				estado: 'q1',
				simbolo: '0',
				resultado: 'q1'
			},
			{ // (q1,1) = q1
				estado: 'q1',
				simbolo: '1',
				resultado: 'q1'
			},
			{ // (q2,0) = q2
				estado: 'q2',
				simbolo: '0',
				resultado: 'q2'
			},
			{ // (q2,1) = q1
				estado: 'q2',
				simbolo: '1',
				resultado: 'q1'
			},
			{ // (q3,1) = q1 (estado inacessível)
				estado: 'q3',
				simbolo: '1',
				resultado: 'q1'
			},
			{ // (q3,1) = q1 (estado inacessível)
				estado: 'q3',
				simbolo: '1',
				resultado: 'q3'
			}
		]
	};

	componentDidMount() {
		this.props.handleStateChange(this.state);
	}
	//Simbolos
	addSimbolo = (s) => {
		if (s !== undefined && s !== null && s !== '') {
			let alreadyContains = this.state.simbolos.indexOf(s) > -1;
			if (!alreadyContains) {
				this.setState({
					simbolos: [...this.state.simbolos, s]
				});
			}
		}
		this.setState({
			simbolo: ''
		});
	}

	delSimbolo = (index) => {
		let newList = this.state.simbolos;
		let s = newList.splice(index, 1);
		this.setState({
			simbolos: newList,
			simbolo: s
		});
	}


	simboloOnChange = (e) => {
		e.preventDefault();
		let value = e.target.value;
		if (!_.includes(this.state.estados, value)) {
			this.setState({
				simbolo: value.charAt(value.length - 1)
			});
		}
	}
	//Estados
	addEstado = (e) => {
		console.log(e);
		if (e !== undefined && e !== null && e !== '') {
			let alreadyContains = this.state.estados.indexOf(e) > -1 || this.state.simbolos.indexOf(e) > -1;
			if (!alreadyContains) {
				this.setState({
					estados: [...this.state.estados, e]
				});
			}
		}
		this.setState({
			estado: ''
		});
	}

	delEstado = (index) => {
		let newList = this.state.estados;
		let e = newList.splice(index, 1);
		this.setState({
			estados: newList,
			estado: e
		});
	}


	estadoOnChange = (e) => {
		e.preventDefault();
		let value = e.target.value;
		if (value.length > 0) {
			this.setState({
				estado: value
			});
		}
	}

	//Selecionar inicial 
	setEstadoInicial = (value, options) => {
		this.setState({
			estadoInicial: value
		});
	}

	//Selecionar finais
	getEstadosOptions = () => {
		let optionsList = [];
		this.state.estados.forEach((estado) => {
			optionsList.push(<Option key={estado}>{estado}</Option>);
		});
		return optionsList;
	}

	changeEstadosFinais = (e) => {
		this.setState({
			estadosFinais: e
		});
	}

	getSimbolosOptions = () => {
		let optionsList = [];
		this.state.simbolos.forEach((simbolo) => {
			optionsList.push(<Option key={simbolo}>{simbolo}</Option>);
		});
		return optionsList;
	}

	addTransicao = () => {
		this.setState(prevState => ({
			transicoes: update(prevState.transicoes, { $push: [{}] })
		}));
	}

	delTransicao = (index) => {
		this.setState(prevState => ({
			transicoes: update(prevState.transicoes, { $splice: [[index, 1]] })
		}))
	}

	setTransicaoEstado = (e, index) => {
		let arrayTransicoes = this.state.transicoes;
		arrayTransicoes[index].estado = e;
		this.setState({
			transicoes: arrayTransicoes
		});
	}

	setTransicaoSimbolo = (e, index) => {
		let arrayTransicoes = this.state.transicoes;
		arrayTransicoes[index].simbolo = e;
		this.setState({
			transicoes: arrayTransicoes
		});
	}

	setTransicaoResultado = (e, index) => {
		let arrayTransicoes = this.state.transicoes;
		arrayTransicoes[index].resultado = e;
		this.setState({
			transicoes: arrayTransicoes
		});
	}

	printConsole = () => {
		console.log(this.state);
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormItem>

					<Row>
						<Col md={12}>
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
										{this.state.simbolos.map((nt, index) =>
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
						</Col>
						<Col md={12}>
							<Card
								className="text-left"
								title={<b>Estados: </b>}
								extra={
									<Fragment>
										<Search
											prefix={<Icon type="tag-o" />}
											placeholder="Simbolo"
											enterButton="Add"
											value={this.state.estado}
											onChange={this.estadoOnChange}
											onSearch={this.addEstado} />
									</Fragment>
								}
							>
								<Row>
									<Col md={24} className="text-center">
										{this.state.estados.map((estado, index) =>
											<Tag
												key={index}
												color="blue"
												onClick={() => this.delEstado(index)}
												name={index}>
												{estado}
											</Tag>)}
									</Col>
								</Row>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<Card
								className="text-left"
								title={<b>Estado inicial:</b>}
							>
								<Select
									showSearch
									className="select-estado-inicial"
									placeholder="Select o estado inicial"
									optionFilterProp="children"
									value={this.state.estadoInicial}
									onSelect={this.setEstadoInicial}
									filterOption={(input, option) => option.props.children.toUpperCase().indexOf(input.toUpperCase()) >= 0}
								>
									{this.state.estados.map((e, indexEstado) =>
										<Option
											value={e}
											key={indexEstado}
										>
											{e}
										</Option>
									)}
								</Select>
							</Card>
						</Col>
						<Col md={6}>
							<Card
								className="text-left"
								title={<b>Estado finais:</b>}
							>
								<Select
									mode="multiple"
									placeholder="Please select"
									value={this.state.estadosFinais}
									onChange={this.changeEstadosFinais}
									style={{ width: '100%' }}
								>
									{this.getEstadosOptions()}
								</Select>
							</Card>
						</Col>
					</Row>
					<Card
						className="text-left"
						title={<b>Transicoes</b>}
						extra={
							<Fragment>
								<Button onClick={this.addTransicao}
									type="primary">
									Adicionar transicao
								</Button>
								<Button onClick={this.printConsole}
									type="primary">
									Print state console
								</Button>
							</Fragment>
						}
					>
						<Row>
							{this.state.transicoes.map((transicao, indexTransicao) =>
								<Col key={indexTransicao} md={6}>
									<Card
										className="text-left"
										title={<b>Transicao {indexTransicao + 1}</b>}
										extra={
											<Fragment>	
												<Button
													type="danger"
													onClick={() => this.delTransicao(indexTransicao)}>
													X
                          						</Button>
											</Fragment>
										}
									>
										<FormItem label="Estado incial:">
											<Select
												className="select-estado-inicial"
												placeholder="Select o estado inicial"
												optionFilterProp="children"
												value={transicao.estado}
												key={indexTransicao}
												onSelect={e => this.setTransicaoEstado(e,indexTransicao)}
												filterOption={(input, option) => option.props.children.toUpperCase().indexOf(input.toUpperCase()) >= 0}
											>
												{this.getEstadosOptions()}
											</Select>

										</FormItem>
										<FormItem label="Estado final:">
											<Select
												className="select-estado-inicial"
												placeholder="Select o estado inicial"
												optionFilterProp="children"
												value={transicao.resultado}
												key={indexTransicao}
												onSelect={e => this.setTransicaoResultado(e, indexTransicao)}
												filterOption={(input, option) => option.props.children.toUpperCase().indexOf(input.toUpperCase()) >= 0}
											>
												{this.getEstadosOptions()}
											</Select>

										</FormItem>
										<FormItem label="Estado final:">
											<Select
												className="select-estado-inicial"
												placeholder="Simbolo"
												optionFilterProp="children"
												value={transicao.simbolo}
												key={indexTransicao}
												onSelect={e => this.setTransicaoSimbolo(e, indexTransicao)}
												filterOption={(input, option) => option.props.children.toUpperCase().indexOf(input.toUpperCase()) >= 0}
											>
												{this.getSimbolosOptions()}
											</Select>

										</FormItem>
									</Card>
								</Col>
							)}
						</Row>
					</Card>
				</FormItem>
			</Form>
		);
	}
}

export default Form.create()(InputForm);