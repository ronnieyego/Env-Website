import { co2CostBySource, co2PerPoundInAmerica, percentGlobalEmissions, worldProduction, worldEmissions } from './aluminum-data';
import ids from '../../../utils/ids/index';

export default {
    name: 'Aluminum',
    amount: {
        co2: co2PerPoundInAmerica,
        units: 'one pound of aluminum',
        excludeIds: [ids.poundOfAluminum]
    },
    sections: [
        {
            title: 'Making Aluminum',
            paragraphs: [
                `Aluminum does not occur naturally in nature.  We refine it from bauxite ore using the Hall–Héroult process.  The bauxite ore is processed and we chemically separate alumina (about 2 pounds bauxite to 1 pound alumina).  From there we dissolve the alumina in molten cryolite and send a strong current through the liquid.  The current removes oxygen atoms from the alumina resulting in aluminum.`,
                `This process is very energy intensive.  It currently takes around 13 kWhs to make 1 KG of aluminum.  As a result, total aluminum emissions vary widely by energy source.  In China where coal is the primary fuel, aluminum production can emit ${co2CostBySource.coal} pounds of CO2e per pound of aluminum produced.  In Iceland where they use hydroelectric and geothermal, emissions can be as low as ${co2CostBySource.hydro} pounds of CO2e per pound of aluminum.  Using natural gas would be around ${co2CostBySource.naturalGas} pounds of CO2e.`,
                `I've estimated America's production at 10 pounds of CO2e per pound of aluminum.  We primarily use natural gas, but with a lot of coal as well.  Additionally, we import a lot of aluminum from Canada and China.`
            ]
        },
        {
            title: 'Global Emissions',
            paragraphs: [
                `Aluminum can be found everywhere, from soda cans to airplanes.  The world produced ${worldProduction} million metric tons of aluminum in 2017 resulting in about ${worldEmissions} million metric tons of CO2e.  Aluminum production acconts for about ${percentGlobalEmissions}% of global emissions.`,
                `We recycled about 17 million metric tons of aluminum in 2017. Recycling reduces the footprint of aluminum by 75%!  This eliminates the energy intensive Hall–Héroult process and replaces it with purifying the scrap metal.`
            ]
        }
    ],
    sources: [
        {
            linkedWord: 'Carbon Trust',
            description: ' has a pretty good high level explanation of the global industry and emissions.',
            url: 'https://www.carbontrust.com/media/38366/ctc790-international-carbon-flows_-aluminium.pdf'
        },
        {
            linkedWord: 'World Aluminum',
            description: ' explores global aluminum flows and production stats.',
            url: 'http://www.world-aluminium.org/statistics/massflow/'
        },
        {
            linkedWord: 'The EPA',
            description: ' has good data on US metal producers and emissions.  It lines up reasonably well with World Aluminum numbers.',
            url: 'https://www.epa.gov/ghgreporting/ghgrp-metals#2017-subsector'
        },
        {
            linkedWord: 'Columbia University',
            description: ' reasearched global emissions.',
            url: 'http://climate.columbia.edu/files/2012/04/GNCS-Aluminum-Factsheet.pdf'
        }
    ]
}
