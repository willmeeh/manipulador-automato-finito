import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd'

import InputForm from './form/Form';

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
          </Row>
      </div>
    );
  }
}

export default App;

