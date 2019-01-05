import { expect } from 'chai';
import getNearestEnergySource from './get-nearest-energy-sources-by-zip';

const FIXTURES = {
    reno: [ 
        { id: '2336',
            name: 'Tracy',
            utilityName: 'Sierra Pacific Power Co',
            city: 'Sparks',
            state: 'NV',
            zip: '89434',
            county: 'Storey',
            lat: '39.562500',
            long: '-119.525000',
            coal: 0,
            oil: 0,
            naturalGas: 916,
            biofuel: 0,
            solar: 0,
            wind: 0,
            geothermal: 0,
            hydro: 0,
            nuclear: 0,
            other: 0,
            plantType: 'utility',
            distance: 17 },
        { id: '6510',
            name: 'Brunswick',
            utilityName: 'Sierra Pacific Power Co',
            city: 'Carson City',
            state: 'NV',
            zip: '89701',
            county: 'Carson City',
            lat: '39.152200',
            long: '-119.747800',
            coal: 0,
            oil: 6,
            naturalGas: 0,
            biofuel: 0,
            solar: 0,
            wind: 0,
            geothermal: 0,
            hydro: 0,
            nuclear: 0,
            other: 0,
            plantType: 'utility',
            distance: 27 },
        { id: '2330',
            name: 'Fort Churchill',
            utilityName: 'Sierra Pacific Power Co',
            city: 'Yerington',
            state: 'NV',
            zip: '89447',
            county: 'Lyon',
            lat: '39.128100',
            long: '-119.132200',
            coal: 0,
            oil: 0,
            naturalGas: 226,
            biofuel: 0,
            solar: 0,
            wind: 0,
            geothermal: 0,
            hydro: 0,
            nuclear: 0,
            other: 0,
            plantType: 'utility',
            distance: 47 },
        { id: '8224',
            name: 'North Valmy',
            utilityName: 'Sierra Pacific Power Co',
            city: 'Valmy',
            state: 'NV',
            zip: '89438',
            county: 'Humboldt',
            lat: '40.881317',
            long: '-117.151605',
            coal: 522,
            oil: 0,
            naturalGas: 0,
            biofuel: 0,
            solar: 0,
            wind: 0,
            geothermal: 0,
            hydro: 0,
            nuclear: 0,
            other: 0,
            plantType: 'utility',
            distance: 170 
        } 
    ],
    closest: { 
        id: '6530',
        name: 'Valley Road',
        utilityName: 'Sierra Pacific Power Co',
        city: 'Reno',
        state: 'NV',
        zip: '89512',
        county: 'Washoe',
        lat: '39.547200',
        long: '-119.795000',
        coal: 0,
        oil: 0,
        naturalGas: 0,
        biofuel: 0,
        solar: 0,
        wind: 0,
        geothermal: 0,
        hydro: 0,
        nuclear: 0,
        other: 0,
        distance: 2 
    }
}

describe('Get nearby energy sources', () => {
    it('gets nearest energy source for RENO', done => {
        const res = getNearestEnergySource({inputZip: '89503' });
        expect(res).to.deep.equal(FIXTURES.reno)
        done()
    })
    it('gets filters based on distance', done => {
        const res = getNearestEnergySource({inputZip: '89503', maxDistance: 18 });
        expect(res).to.deep.equal([FIXTURES.reno[0]])
        done()
    })
    it('gets all stations, not just utilities', done => {
        const res = getNearestEnergySource({inputZip: '89503', allStations: true, maxDistance: 3 });
        expect(res).to.deep.equal([FIXTURES.closest])
        done()
    })
})