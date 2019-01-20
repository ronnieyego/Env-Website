// This is a name mapping util

const sourceMap = {
    coal: 'Coal',
    hydroelectric: 'Hydroelectric',
    hydro: 'Hydroelectric',
    wind: 'Wind',
    geothermal: 'Geothermal',
    naturalGas: 'Natural Gas',
    petroleum: 'Oil',
    solar: 'Solar',
    nuclear: 'Nuclear',
    oil: 'Oil'
};

const cssMap = {
    coal: 'circle-red',
    hydroelectric: 'circle-blue',
    wind: 'circle-green',
    naturalGas: 'circle-lightblue',
    petroleum: 'circle-black',
    solar: 'circle-yellow',
    nuclear: 'circle-orange'
};

const producerMap = {
    'all': 'All',
    'IPP CHP': 'Private Co-generation',
    'IPP Non-CHP': 'Private non Co-generation',
    'Electric Utility': 'Electric Utility'
}

const getSourceDisplayname = source => {
    const name = sourceMap[source];
    if(!name) {
        console.log('Couldnt find sourceDisplayName for: ', source);
    }
    return name;
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