import React from "react";
import { connect } from 'react-redux';
import { array, bool, number, string} from 'prop-types';

import BarChartMobile from './BarChartMobile';
// import BarChartReactCharts from './BarChart-ReactCharts';
import BarChartDesktop from './BarChartDesktop';
import BarCharrtBiaxialDesktop from  './BarChartBiaxialDesktop';

@connect(store => {
	return {
		isMobile: store.userInfo.isMobile,
	};
})
export default class BarChartHoc extends React.Component {

    static propTypes = {
        key: string,
        graphData: array, // Array of {name: 'Grilling', You: grillCo2 || 0, 'Average American': 55 },
        dataKey: string, // Data key to look for in data set.
        compare: bool, // If true, looks for average american.  
        units: string, //units on left side
        title: string,
        subtitle: string,
        defaultMax: number,
        mobileHeaders: array, // For mobile, table headers from left -> right 
        biAxial: bool,
        rightDataKey: string,
        rightUnits: string
        

    }
    // TODO:  Split compare into its own file.
    render() {
        let barChart;
        if(this.props.isMobile) {
            barChart = (<BarChartMobile {...this.props} width={300} height={250} />);
        } else if (this.props.biaxial) {
            barChart = (<BarCharrtBiaxialDesktop {...this.props} />);
        } else {
            barChart = (<BarChartDesktop {...this.props} />);
        }
        return (
            <div>
                {barChart}
             </div>
        );
    }
}