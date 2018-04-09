import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import { furnitureData } from './furniture-data';
import Furniture from './Furniture';

import { americanFurniture } from '../../../utils/utils-data/american-averages';
import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';


@connect((store, props) => {
	return {
        questions: store.costsForms.questions,
        aaHouseType: store.footprintFormAnswers.averageAmericanHouseType,
    };
})
export default class FurnitureHoc extends React.Component {

    getTotalCo2(questions) {
        // Add lamps
        const numTables = getAnswerFromId(questions, ids.numTables);
        const numChairs = getAnswerFromId(questions, ids.numChairs);
        const numBeds = getAnswerFromId(questions, ids.numBeds);
        const numCouches = getAnswerFromId(questions, ids.numCouches);
        const numDrawers = getAnswerFromId(questions, ids.numDrawers);
        const numBookcases = getAnswerFromId(questions, ids.numBookcases);

        const tableCo2 = numTables * furnitureData.table.dining.amount;
        const chairCo2 = numChairs * furnitureData.chair.wooden.amount;
        const bedCo2 = numBeds * (furnitureData.bed.queen.amount + furnitureData.bed.frame.amount);
        const couchCo2 = numCouches * furnitureData.sofa.couch.amount;
        const drawerCo2 = numDrawers * furnitureData.storage.drawer.amount;
        const bookcaseCo2 = numBookcases * furnitureData.storage.bookcase.amount;
        const totalCo2 = tableCo2 + chairCo2 + bedCo2 + couchCo2 + drawerCo2 + bookcaseCo2;

        return { totalCo2, tableCo2, chairCo2, bedCo2, couchCo2, drawerCo2, bookcaseCo2 }
    }

    getAverageAmerican(housing) {
        const aaTableCo2 = americanFurniture[housing].tables * furnitureData.table.dining.amount;
        const aaChairCo2 = americanFurniture[housing].chairs * furnitureData.chair.wooden.amount;
        const aaBedCo2 = americanFurniture[housing].beds * (furnitureData.bed.queen.amount + furnitureData.bed.frame.amount);
        const aaCouchCo2 = americanFurniture[housing].couches * furnitureData.sofa.couch.amount;
        const aaDrawerCo2 = americanFurniture[housing].drawers * furnitureData.storage.drawer.amount;
        const aaBookcaseCo2 = americanFurniture[housing].bookcases * furnitureData.storage.bookcase.amount;
        const aaTotalCo2 = aaTableCo2 + aaChairCo2 + aaBedCo2 + aaCouchCo2 + aaDrawerCo2 + aaBookcaseCo2;

        const keys = Object.keys(americanFurniture[housing]);
        const aaTotalFurniture = keys.reduce((accumlator, key) => {
            return accumlator + americanFurniture[housing][key];
        }, 0);
        return {aaTotalFurniture, aaTotalCo2, aaTableCo2, aaChairCo2, aaBedCo2, aaCouchCo2, aaDrawerCo2, aaBookcaseCo2}
    }

    updateHouseTypeDropdown(event, index, value) {
        this.props.dispatch({type: 'UPDATE_AVERAGE_AMERICAN_HOUSE_TYPE', payload: value});
    }

	render() {
        const questions = this.props.questions.filter(question => { 
            const forms = question['forms'];
            const index = forms.indexOf('furniture');
            return index !== -1 && !question.hidden; 
        });
        const aaAverageHouse = this.props.aaHouseType === 'Small Apartment' ? 'apartment' : 'house';
        const { totalCo2, tableCo2, chairCo2, bedCo2, couchCo2, drawerCo2, bookcaseCo2 } = this.getTotalCo2(questions);
        const { aaTotalFurniture, aaTotalCo2, aaTableCo2, aaChairCo2, aaBedCo2, aaCouchCo2, aaDrawerCo2, aaBookcaseCo2 } =  this.getAverageAmerican(aaAverageHouse);
        

        const graphData = [
            {name: 'Tables', You: tableCo2, 'Average American': aaTableCo2},
            {name: 'Chairs', You: chairCo2, 'Average American': aaChairCo2},
            {name: 'Bedding', You: bedCo2, 'Average American': aaBedCo2},
            {name: 'Couches', You: couchCo2, 'Average American': aaCouchCo2},
            {name: 'Drawers', You: drawerCo2, 'Average American': aaDrawerCo2},
            {name: 'Bookcases', You: bookcaseCo2, 'Average American': aaBookcaseCo2}
        ];

		return (
            <Furniture
                dispatch={this.props.dispatch}    
                questions={questions}
                graphData={graphData}
                totalCo2={totalCo2}
                aaHouseType={this.props.aaHouseType}
                aaTotalFurniture={aaTotalFurniture}
                aaTotalCo2={aaTotalCo2}
                updateHouseTypeDropdown={this.updateHouseTypeDropdown}
             />
		);
	}
}


