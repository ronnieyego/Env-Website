import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import BarChartBiaxialDesktop from './BarChartBiaxialDesktop';

const graphData = [
    { name: 'test1', key1: 5, key2: 10},
    { name: 'test2', key1: 6, key2: 11},
    { name: 'test3', key1: 7, key2: 12},
    { name: 'test4', key1: 8, key2: 13},
];

 describe('Bar Chart', () => {
    it('render the biaxial chart', done => {
        shallow(<BarChartBiaxialDesktop
                graphData={graphData}
                biaxial={true}
                dataKey="key1"
                rightDataKey="key2"
                units="test"
                rightUnits="test2"
                defaultMax={5}
                rightDefaultMax={10}
            />);

        done();
    });
});
