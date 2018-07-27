// Heating
export const naturalGasCo2 = 0.117; // Per cubic foot
export const btusLostPerSqft = 8;  // {Per hour}
export const btusToHeat = 0.6; // Btus to heat 1 sqft 1 degree
export const btusPerNaturalGas = 1030; // Btus per cubic foot of natural gas
export const btusLostByInsulation = {
    // Percent increase in heat loss
    'Extremely Insulated': 0.66,
    'Reasonably Insulated': 1,
    'Somewhat Insulated': 1.33,
    'Poorly Insulated': 1.66
};
// http://cadetheat.com/blog/right-wattage-heater/
export const radiatorWattageBySqft = 8.5;
export const radiantFloorWattageBySqft = 12;
export const btusPerKwhHeatPump = 1100
export const personalHeaterWattage = 250;


// Cooling

// https://www.comfort-pro.com/2015/10/how-much-energy-does-an-air-conditioner-ac-use-infographic/
export const acWattage = {
    small: 560, // 6000 btus
    'Window Mount AC': 900, // Aka medium
    large: 1440,
    'Central AC': 3400 // Central Air Conditioning does it for the whole house.
}
const wattsPerBtuWindowAc = .085; // Based on the above, how many watts per btu

export const acPenaltyTempDiff = 10;
export const acWattageTemperature = .03; 
// For every degree hotter it is, your AC uses about 3% more energy
// In reality it uses the same amount of energy, but is on more
// Im assuming this penalty kicks in after 10 DEGREES DIFFERENCE

const btusPerSqft = 20; // Rule of thumb, it takes 20 BTUS to cool each additional sqft of space.

export const fanWattage = 50;
// Ceiling fan are about 90.  Tiny desk fans are around 30;
