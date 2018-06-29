import React, { Component, Fragment } from 'react';
import { Button, Form, Icon, Input, Row, Col, Tag, Select, Card } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { Search } = Input;

class InputForm extends Component {

  state = {
    nonTerminal: '',
    terminal: '',
    nonTerminalList: [],
    terminalList: [],
    productionsList: [],
    production: {
      nonTerminal: '',
      terminalsList: []
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
            
        </FormItem>
      </Form>
    );
  }
}

const GrammarForm = Form.create()(InputForm)
export default GrammarForm;