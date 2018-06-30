import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd'

import InputForm from './form/Form';
import VerificadorAfnAfnd from './helpers/VerificadorAfnAfnd';
import VerificarSePertenceALinguagem from './helpers/VerificarSePertenceALinguagem';

class App extends Component {
  state = {
    formPayload: {}
  }

  handleFormStateChange = (formPayload) => {
    this.setState({ formPayload });

    console.log('formPayload', formPayload);
  };

  render() {
    return (
      <div className="App">
          <Row style={{ background: '#ECECEC', padding: '30px' }} >
            <Col md={16}>
                <InputForm handleStateChange={this.handleFormStateChange} />
            </Col>
            <Col md={8}>
              <Row>
                <Col md={24}>
                  <VerificadorAfnAfnd formPayload={this.state.formPayload} />
                </Col>
                <Col md={24}>
                  <VerificarSePertenceALinguagem formPayload={this.state.formPayload} />
                </Col>
              </Row>
            </Col>
          </Row>
      </div>
    );
  }
}

export default App;

