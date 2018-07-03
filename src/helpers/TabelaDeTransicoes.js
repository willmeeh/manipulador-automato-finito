import React, { Component, Fragment } from 'react';
import { Card } from 'antd';

export default class TabelaDeTransicoes extends Component {

  renderizarTransicoes(transicoes) {
    return transicoes && transicoes.map(({ simbolo, estado, resultado }, index) => (
      <p key={index}>
        {`(${estado}, ${simbolo}) = ${resultado}`}
      </p>
    ));
  }

	render() {
		const cardStyle = {
			textAlign: 'left',
    };

		return (
			<Fragment>
				<Card style={cardStyle}>
          <h2>Novas Transições Geradas</h2>
          {this.renderizarTransicoes(this.props.transicoes)}
				</Card>
			</Fragment>
		);
	}
}







