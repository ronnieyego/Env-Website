

// For concrete 1.7 kg/Joule
//KiloGram/KiloJoule -> KwH/Pound
// Source: http://peakoil.com/forums/about-the-energy-needed-for-portland-cement-1700j-g-t17729.html
const kgPerKjToKwhPerPound = kgPerJoule => {
    const gramPerPound = 453.592
    const kwhPerKj = 0.000277778;
    return kgPerJoule * gramPerPound * kwhPerKj;
}
// For non fletton bricks (common bricks)
// GigaJoules/Tonne -> kwh/pounds
// source: http://www.cibse.org/getmedia/26d2edc3-daf1-47f5-b882-d7d06a790440/ECG43-Energy-Consumption-in-the-Non-fletton-Clay-Brickmaking-Industry.pdf.aspx
const gjPerTonneToKwhPerPound = gjPerTonne => {
    const poundsPerTonne = 2204.60;
    const kwhPerGj = 277.778;
    return gjPerTonne / poundsPerTonne * kwhPerGj;
}

console.log(kgPerKjToKwhPerPound(1.7)); // 0.2141963935792 <---- should be
console.log(gjPerTonneToKwhPerPound(2.7)); // 0.3401980404608546 <---- SHould be


