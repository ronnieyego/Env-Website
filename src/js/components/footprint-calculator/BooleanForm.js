import React, {PropTypes} from "react";

export default class ApplianceForm extends React.Component {

    constructor(props) {
	    super();
	}

	render() {

        const subCategory = {
            fontWeight: 'bold',
            textAlign: 'center'
        };
        const questionsStyle = {
            textAlign: 'left',
            marginLeft: '15px',
            marginTop: '5px',
            marginBottom: '5px'
        };

		return (
            <div>
            <h3 style={subCategory}>Monthly use Appliances</h3>
                <div style={questionsStyle}>
                    <ul>Do you own the following?
                        {this.props.questions}
                    </ul>
                </div>
            </div>
		);
	}
};

