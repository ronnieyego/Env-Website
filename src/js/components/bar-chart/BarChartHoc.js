import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BarChartMobile from './BarChartMobile';
import BarChartDesktop from './BarChartDesktop';

@connect((store, props) => {
	return {
		isMobile: store.userInfo.isMobile,
	};
})
export default class BarChartHoc extends React.Component {

    static propTypes = {
        key: PropTypes.string,
        graphData: PropTypes.array, // Array of {name: 'Grilling', You: grillCo2 || 0, 'Average American': 55 },
        dataKey: PropTypes.string, // Data key to look for in data set.
        compare: PropTypes.bool, // If true, looks for average american.  
        units: PropTypes.string, //units on left side
        title: PropTypes.string,
        mobileHeaders: PropTypes.array // For mobile, table headers from left -> right 

    }
    render() {
        const barChart = this.props.isMobile ? <BarChartMobile {...this.props} /> : <BarChartDesktop {...this.props} />
        return (
            <div>
                {barChart}
             </div>
        );
    }
}