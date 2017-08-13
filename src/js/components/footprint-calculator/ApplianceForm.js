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
            <h3 style={subCategory}>Daily use Appliances</h3>
                <div style={questionsStyle}>
                    How many hours a day do you use the following?
                    <ul>
                        {this.props.questions}
                    </ul>
                </div>
            </div>
		);
	}
};

