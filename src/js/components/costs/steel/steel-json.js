import { ironOre, lbCo2PerLbSteel, globalFacts } from './steel-data';
import ids from '../../../utils/ids/index';

export default {
    name: 'Steel',
    amount: {
        co2: lbCo2PerLbSteel,
        units: 'one pound of steel',
        excludeIds: [ids.poundOfSteel]
    },
    sections: [
        {
            title: 'Global Emissions',
            paragraphs: [
                `As a foundation of modern society, steel is strong, fleible, and lasts a long time.  Steel is responsible for about ${globalFacts.globalEmissionsPercent}% of total global emissions.  Making steel results in over 2,000 metric tonnes of CO2 each year.`
            ]
        },
        {
            title: 'Making Steel',
            paragraphs: [
                `We make steel by purfying iron ore and adding mixings (a little carbon and chromium to make stainless steel).  Mining iron ore is surprisingly cheap from a carbon perspective at ${ironOre} pounds of CO2 per pound of iron ore.  Most of the steel emissions comes from the purifying part of the process.  Most steel producers use a blast furnace to melt the iron and add the mixins.  This process superheats the materials to over 1,000 degrees Celsius.  Most of the emissions come from this stage.`,
                'Different countries have varying emissions for steel production.  These range on the lower end of 1.25 pounds of CO2 per pound of steel (Mexico) to about 3.5 pounds of CO2 per pound of steel (China).  This varies so much due to differences in technology, process, and facilities.'
            ]
        }
    ]
}
