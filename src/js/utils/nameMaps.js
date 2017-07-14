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
    naturalGas: 'circleGray',
    petroleum: 'circleBlack',
    solar: 'circleYellow',
    nuclear: 'circleWhite'
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