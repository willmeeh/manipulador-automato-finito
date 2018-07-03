import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd'

import InputForm from './form/Form';
import VerificadorAfnAfnd from './helpers/VerificadorAfnAfnd';
import VerificarSePertenceALinguagem from './helpers/VerificarSePertenceALinguagem';
import AfndToAfd from './helpers/afnd-to-afd/AfndToAfd';
import MinimizarAfd from './helpers/MinimizarAfd';
import TabelaDeTransicoes from './helpers/TabelaDeTransicoes';

class App extends Component {
  state = {
    formPayload: {},
    formPayloadAfndToAfd: {}
  }

  handleFormStateChange = (formPayload) => {
    this.setState({ formPayload });
    console.log('formPayload', formPayload);
  };

  handleOnAfndToAfd = (formPayloadAfndToAfd) => {
    this.setState({ formPayloadAfndToAfd });
    console.log('formPayloadAfndToAfd', formPayloadAfndToAfd);
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
              <Col md={24}>
                <MinimizarAfd
                  formPayload={this.state.formPayload}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ background: '#ECECEC', padding: '30px' }} >
          <Col md={24}>
            <AfndToAfd
              onAfndToAfd={this.handleOnAfndToAfd}
              formPayload={this.state.formPayload}
            />
          </Col>
        </Row>
        { this.state.formPayloadAfndToAfd.trasicoes &&
          <Row style={{ background: '#ECECEC', padding: '30px' }} >
            <Col md={8}>
              <TabelaDeTransicoes transicoes={this.state.formPayloadAfndToAfd.trasicoes}/>
            </Col>
            <Col md={8}>
              <VerificadorAfnAfnd formPayload={this.state.formPayloadAfndToAfd} />
              <VerificarSePertenceALinguagem formPayload={this.state.formPayloadAfndToAfd} />
            </Col>
          </Row>
        }
      </div>
    );
  }
}

export default App;

