import React from "react";
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';

import CostsFooter from '../CostsFooter';
import pages from '../pages-index';
import ids from '../../../utils/ids/index';

const data = Object.keys(pages);

const onNewRequest = (chosenRequest, index) => {
    if(index !== -1) {
        window.location.href = `/costs/${chosenRequest}`
    }
}

export default class CostsSearch extends React.Component {


	render() {
		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO<sub>2</sub> cost of things?</h3>
                <p className="costs-form-sub-text">Use the search below to discover the CO<sub>2</sub> cost.</p>
                <AutoComplete 
                    dataSource={data}
                    hintText="What are you looking for?"
                    onNewRequest={onNewRequest}
                />

                <CostsFooter />
            </div>
		);
	}
}


