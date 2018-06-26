

// https://www.comfort-pro.com/2015/10/how-much-energy-does-an-air-conditioner-ac-use-infographic/
export const acWattage = {
    small: 560, // 6000 btus
    medium: 900, // Around 10000 btus
    large: 1440,
    central: 3400 // Central Air Conditioning does it for the whole house.
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
