import React, { Component, Fragment } from 'react';
import { Card } from 'antd';

export default class VerificadorAfnAfnd extends Component {

  analisar = (formPayload) => {

	};

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