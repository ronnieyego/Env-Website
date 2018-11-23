import React from "react";
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton'
// import Checkbox from 'material-ui/Checkbox';
import HoverText from '../HoverText';
// import { formatName } from './utils';

export default class BooleanQuestion extends React.Component {

    static propType = {
        isMobile: PropTypes.bool,
        updateQuestion: PropTypes.func, 
        question: PropTypes.object
    }

    updateQuestion(e) {
        const id = e.target.id;
        let value = document.getElementById(id).value;
        value = this.props.question.checked && value === 'on' ? 'off' : 'on';
        const questionInfo = { id, value };
        this.props.dispatch(this.props.updateFunction(questionInfo));
    }

	render() {
        const question = this.props.question;
        const checked = question.value;
        const containerClass = `form-question-container${!this.props.isMobile ? ' row' : '-mobile'}`;
        const nameClass = `form-question-name ${!this.props.isMobile ? 'col-md-3' : ''}`;
        return (
            <div className={containerClass}>
                <p className={nameClass}>{question.name}</p>
                <div className="form-question col-md-6" >
                    <RaisedButton 
                        buttonStyle={checked ? { background: 'linear-gradient(#E7EAE0 30%, #85A774 90%)' } : { background: '#ffffff'}}
                        key={`Yes-${question.name}`}
                        label="Yes"
                        labelColor={checked ? '#ffffff' : '#000000'}
                        onClick={() => this.props.dispatch(this.props.updateFunction({ id: question.id, value: true }))}
                        style={{ width: '100px'}}
                        value={'on'}  
                    />
                    <RaisedButton 
                        buttonStyle={!checked ? {background: 'linear-gradient(#E7EAE0 30%, #85A774 90%)' } : { background: '#ffffff' }}
                        key={`No-${question.name}`}
                        label="No"
                        labelColor={!checked ? '#ffffff' : '#000000'}
                        onClick={() => this.props.dispatch(this.props.updateFunction({ id: question.id, value: false }))}
                        style={{ width: '100px'}}
                        value={'off'}  
                    />
                        {/* <HoverText id={question.id} text={question.hoverText} /> */}
                </div>
                <p className="form-question-subtext col-md-3">{question.subtext}</p>
            </div>
		);
	}
};
