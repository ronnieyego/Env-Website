import React from "react";
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';

import pages from '../pages-index';
import ids from '../../../utils/ids/index';

const data = Object.keys(pages);

const onNewRequest = (chosenRequest, index) => {
    console.log(`/costs/${chosenRequest}`);
    if(index !== -1) {
        window.location.href = `/costs/${chosenRequest}`
    }
    console.log('chosenRequest', chosenRequest);
    console.log('index', index);
}

export default class CostsSearch extends React.Component {


	render() {
		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO<sub>2</sub> cost of things?</h3>
                <AutoComplete 
                    dataSource={data}
                    hintText="What are you looking for?"
                    onNewRequest={onNewRequest}
                />
            </div>
		);
	}
}


