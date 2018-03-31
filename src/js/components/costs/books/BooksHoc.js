import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import { booksQuestions, co2PerBook, electronics, timeToReadBook } from './books-data';
import Books from './Books';
import { utilityEmissionsPerState }from '../../../utils/utils-data/state-energy-and-emissions';
import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.costsForms.questions,
        userState: store.userInfo.userState
    };
})
export default class BooksHoc extends React.Component {

    componentDidMount() {
        const questions = _.filter(this.props.questions, question => { question['forms'].indexOf('books') !== -1 });
        if(questions.length < booksQuestions.length) {
            const questionsToAdd = booksQuestions.filter(question => {
                const isNotQuestionInSet = getQuestionFromId(questions, question.id) ? false : true;
                return isNotQuestionInSet;
            });
            this.props.dispatch({type: 'ADD_QUESTIONS_TO_COST_QUESTIONS', payload: questionsToAdd});
        }
    }

    getBooksCo2(numberBooks) {
        if(parseFloat(numberBooks) > 0 ) {
            return co2PerBook * numberBooks;
        }
        return 0;
    }

    getDevicesCo2(booksRead) {
        const co2PerKwh = utilityEmissionsPerState['US'];
        // use is in kw
        const ereaderUse = electronics.ereader.creation + Math.round((electronics.ereader.energy * booksRead * timeToReadBook * co2PerKwh * 10)/10);
        const tabletUse = electronics.tablet.creation + Math.round((electronics.tablet.energy * booksRead * timeToReadBook * co2PerKwh * 10)/10);
        const laptopUse = electronics.laptop.creation + Math.round((electronics.laptop.energy * booksRead * timeToReadBook * co2PerKwh * 10)/10);
        const desktopUse = electronics.desktop.creation + Math.round((electronics.desktop.energy * booksRead * timeToReadBook * co2PerKwh * 10)/10);
        return {
            ereader: ereaderUse,
            tablet: tabletUse,
            laptop: laptopUse,
            desktop: desktopUse
        }
    }

    getCo2(questions) {
        const numberBooks = getAnswerFromId(questions, ids.numberBooks) || 0;
        const booksCo2 = this.getBooksCo2(numberBooks);
        const deviceCo2 = this.getDevicesCo2(numberBooks);
        return {
            booksCo2,
            ...deviceCo2
        }
    }

	render() {
        let questions = _.filter(this.props.questions, question => { 
            const forms = question['forms'];
            const index = forms.indexOf('books');
            return index !== -1 && !question.hidden; 
        });

        const {booksCo2, ereader, tablet, laptop, desktop } = this.getCo2(questions);
        const totalCo2 = booksCo2;

        const graphData = [
            {name: 'Books', Device: booksCo2},
            {name: 'E-Reader', Device: ereader},
            {name: 'Tablet', Device: tablet},
            {name: 'Laptop', Device: laptop},
            {name: 'Desktop', Device: desktop}
        ];
        
		return (
            <Books
                dispatch={this.props.dispatch}    
                questions={questions}
                totalCo2={totalCo2}
                graphData={graphData}
             />
		);
	}
}


