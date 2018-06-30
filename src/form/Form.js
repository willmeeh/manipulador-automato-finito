import React, { Component } from 'react';
import { Form } from 'antd';

const FormItem = Form.Item;

class InputForm extends Component {

	state = {
		simbolos: ['0', '1'],
		estados: ['q0', 'q1', 'q2'],
		estadoInicial: 'q0',
		estadosFinais: ['q1'],
		transicoes: [
			{ // (q0,0) = q2
				estado: 'q0',
				simbolo: '0',
				resultado: ['q2','q1']
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
			}
		]
	};

	componentDidMount() {
    this.props.handleStateChange(this.state);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>

        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(InputForm);