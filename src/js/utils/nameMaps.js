// This is a name mapping util

const sourceMap = {
    coal: 'Coal',
    hydroelectric: 'HydroElectric',
    wind: 'Wind',
    naturalGas: 'Natural Gas',
    petroleum: 'Oil',
    solar: 'Solar',
    nuclear: 'Nuclear'
};

const producerMap = {
    'all': 'All',
    'IPP CHP': '??? Also Private??',
    'IPP Non-CHP': 'Private',
    'Electric Utility': 'Electric Utility'
}

const getSourceDisplayname = source => {
    return sourceMap[source];
}

const getProducerDisplayname = source => {
    return producerMap[source];
}

module.exports = {
    getProducerDisplayname,
    getSourceDisplayname
}