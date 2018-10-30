import React from 'react';
import { shallow } from 'enzyme';
import GenericCostsPage from './GenericCostsPage';
import steel from './steel/steel-json';
import aluminum from './aluminum/aluminum-json';


describe('Generic Costs Page', () => {
    it('renders steel', done => {
        shallow(<GenericCostsPage {...steel} />)
        done();
    });

    it('renders aluminum', done => {
        shallow(<GenericCostsPage {...aluminum} />)
        done();
    });
});