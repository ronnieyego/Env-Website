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

const cssMap = {
    coal: 'circleRed',
    hydroelectric: 'circleBlue',
    wind: 'circleGreen',
    naturalGas: 'circleLightBlue',
    petroleum: 'circleBlack',
    solar: 'circleYellow',
    nuclear: 'circleOrange'
};

const producerMap = {
    'all': 'All',
    'IPP CHP': 'Private Co-generation',
    'IPP Non-CHP': 'Private non Co-generation',
    'Electric Utility': 'Electric Utility'
}

const getSourceDisplayname = source => {
    return sourceMap[source];
}

const getSourceCssName = source => {
    return cssMap[source];
}

const getProducerDisplayname = source => {
    return producerMap[source];
}

module.exports = {
    getSourceCssName,
    getProducerDisplayname,
    getSourceDisplayname
}