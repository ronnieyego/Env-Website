import React from 'react';
import { shallow } from 'enzyme';
import steel from './steel/steel-json';
import GenericCostsPage from './GenericCostsPage';

describe('Generic Costs Page', () => {
    it('renders steel', done => {
        shallow(<GenericCostsPage {...steel} />)
        done();
    });
});