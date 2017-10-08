import React from "react";
import { connect } from 'react-redux';


@connect((store, props) => {
	return {
		text: store.footprintForm.text,
        questions: store.footprintForm.questions
	};
})
export default class ReduxTestHoc extends React.Component {

  constructor(props) {
      super();
      this.state = {
          test: 'lol'
      }
      this.setState({test: 'loloo'});
  }
  addQuestion() {
      this.props.dispatch({type: 'ADD_QUESTION', payload: 'Questions!!'});
  }
  removeQuestion() {
      this.props.dispatch({type: 'REMOVE_QUESTIONS'});
  }


  render() {
      console.log('this props', this.props);
      const questions = this.props.questions.map( q => {
          return <li>{q}</li>;
      });

      

      return (
          <div>
            <button onClick={this.addQuestion.bind(this)}>Add Q</button>
            <button onClick={this.removeQuestion.bind(this)}>Remove Q</button>
            <ul>Questions
                {questions}
            </ul>
        </div>
      )
    }
}
