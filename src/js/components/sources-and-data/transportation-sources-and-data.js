export default [
    {
        description: 'CO2 per gallon of gas',
        value: 19.6,
        sourceName: 'EIA',
        sourceLink: 'https://www.eia.gov/environment/emissions/co2_vol_mass.php',
        notes: 'Varies by ethanol content'
    },
    {
        description: 'CO2 per gallon of jet fuel',
        value: 21.1,
        sourceName: 'EIA',
        sourceLink: 'https://www.eia.gov/environment/emissions/co2_vol_mass.php',
        notes: ''
    },
    {
        description: 'CO2 per gallon of diesel',
        value: 22.4,
        sourceName: 'EIA',
        sourceLink: 'https://www.eia.gov/environment/emissions/co2_vol_mass.php',
        notes: ''
    },
    {
        description: 'Kwh per gallon of gas',
        value: 34.4,
        sourceName: 'Wikipedia',
        sourceLink: 'https://en.wikipedia.org/wiki/Gasoline_gallon_equivalent',
        notes: ''
    },
    {
        description: 'Kwh per gallon of jet fuel',
        value: 37.12,
        sourceName: 'Wikipedia',
        sourceLink: 'https://en.wikipedia.org/wiki/Gasoline_gallon_equivalent',
        notes: ''
    },
    {
        description: 'Kwhs per 100 miles for an electric car',
        value: 30,
        sourceName: 'Wikipedia and EPA',
        sourceLink: 'https://en.wikipedia.org/wiki/Electric_car_energy_efficiency',
        notes: 'Most values are between 25-38 so I unscientifically chose 30',
    },
    {
        description: 'MPG per person on a bus',
        value: 31.46,
        sourceName: 'US Department of Energy',
        sourceLink: 'https://www.afdc.energy.gov/data/10311',
        notes: 'This is a weighted average based on bus fuel type and ridership'
    },
    {
        description: 'MPG per person on a train',
        value: 50.59,
        sourceName: 'US Department of Energy',
        sourceLink: 'https://www.afdc.energy.gov/data/10311',
        notes: 'Also a weighted average.  '
    },
    {
        description: 'MPG per person on a plane',
        value: 84.9,
        sourceName: 'Wikipedia',
        sourceLink: 'https://en.wikipedia.org/wiki/Fuel_economy_in_aircraft',
        notes: 'Wikipedia seemed like a better source than the previous ones.  This assumes full flights (reasonable assumption).  I unscientifically took the average of Boeing jets.'
    }
    // {
    //     description: '',
    //     value: 0,
    //     sourceName: '',
    //     sourceLink: '',
    //     notes: ''
    // }

]