// This util takes in data and calculates your energy footprint.  Yay!

export default function(data, metaData) {
    // Calculate hourly
    console.log('data is', data);
    let hourly = data.appliance.hour;
    let hourlySum = 0;
    hourly.forEach(answer => {
        let sum = answer.kwh * answer.value;
        hourlySum += sum;
    });
    return hourlySum;
}


// {
//     "appliance": "portable-heater",
//     "kwh": 1.5,
//     "use-type": "hour"
//   },
//   {
//     "appliance": "house-heat-pump",
//     "kwh": 10,
//     "use-type": "hour"
//   },