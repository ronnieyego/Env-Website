import React from 'react';
import { number } from 'prop-types';
import { Chart } from "react-charts";

export default class BarChartReactChart extends React.Component {

    static propTypes = {
        width: number,
        height: number
    }

    render() {

        return (
            <div style={{width: this.props.width, height: this.props.height}} >
                <Chart
                    data={[
                        {
                        label: "Series 1",
                        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
                        },
                        {
                        label: "Series 2",
                        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
                        }
                    ]}
                    axes={[
                        { primary: true, type: "linear", position: "bottom" },
                        { type: "linear", position: "left" }
                    ]}
                />
            </div>
        )
    }
}