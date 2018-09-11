import { 
    co2PerPoundOfFabric,
    pantsMaterial,
    percentShoeIsRubber,
    sizeDifference,
    weightOfClothes,
    womenWeightDiff 
} from '../../costs/clothes/clothes-data';
import { clothesLife, profiles } from '../data/clothes';
import { convertLifetimeToMonthly } from './utils';
import isThere from '../../../utils/is-there';
import ids from '../../../utils/ids/index';

const getShirtCo2 = (shirts, shirtMaterial) => {
    const shirtWeight = weightOfClothes.shirt;
    const co2PerShirt = co2PerPoundOfFabric[shirtMaterial] * shirtWeight;
    const totalCo2 = co2PerShirt * shirts;
    return totalCo2;
}

const getJacketCo2 = (jackets, jacketMaterial) => {
    const jacketWeight = weightOfClothes.jacket;
    const co2PerJacket = co2PerPoundOfFabric[jacketMaterial] * jacketWeight;
    const totalCo2 = co2PerJacket * jackets;
    return totalCo2;
}

const getPantsCo2 = (pants, pantMaterial) => {
    const pantsWeight = pantsMaterial[pantMaterial].weight;
    const pantsCo2 = pantsMaterial[pantMaterial].co2;
    const co2PerPant = pantsCo2 * pantsWeight;
    const totalPantCo2 = co2PerPant * pants;
    return totalPantCo2;
}

const getShortsCo2 = (shorts, pantMaterial) => {
    const shortWeight = weightOfClothes.shorts;
    const co2PerShort = pantsMaterial[pantMaterial].co2 * shortWeight;
    const totalShortCo2 = co2PerShort * shorts;
    return totalShortCo2;
}

const getShoeCo2 = (shoes, shoeType) => {
    const shoeWeight = weightOfClothes[shoeType];
    const leatherWeight = (shoeWeight * (1-percentShoeIsRubber));
    const rubberWeight = (shoeWeight * percentShoeIsRubber);
    const co2PerShoe = (co2PerPoundOfFabric.Leather * leatherWeight) + (co2PerPoundOfFabric.Rubber * rubberWeight);
    const totalCo2 = co2PerShoe * shoes;
    return totalCo2;
}

const getSocksUnderwearCo2 = socksUndies => {
    // They have the same weight
    const socksUndiesWeight = weightOfClothes.socks;
    const co2PerSockUndie = socksUndiesWeight * co2PerPoundOfFabric.Cotton;
    const totalCo2 = co2PerSockUndie * socksUndies;
    return totalCo2;
}

const getAccessoriesCo2 = accessories => {
    const accessoriesWeight = weightOfClothes.scarf //just guessing here.  Is pretty middle of the road
    const co2PerAccessory = accessoriesWeight * co2PerPoundOfFabric.Cotton;
    const totalCo2 = co2PerAccessory * accessories;
    return totalCo2;
}

// This is size and gender
const getMultiplier = (gender, size) => {
    const genderMultiplier = gender === 'Male' ? 1 : womenWeightDiff;
    const sizeMultiplier = sizeDifference[size];
    const multiplier = genderMultiplier * sizeMultiplier;
    return multiplier;
}

const checkIfAllFieldsPresent = ({ gender, size, shirts, jackets, shirtMaterial, pants, shorts, pantsMaterial, shoes, shoeType, socksUndies, accessories }) => {
    isThere(gender, 'gender, is required');
    isThere(size, 'size is required');
    isThere(shirts, 'shirts is required');
    isThere(jackets, 'jackets is required');
    isThere(shirtMaterial, 'shirtMaterial is required');
    isThere(pants, 'pants is required');
    isThere(shorts, 'shorts is required');
    isThere(pantsMaterial, 'pantsMaterial is required');
    isThere(shoes, 'shoes is required');
    isThere(shoeType, 'shoeType is required');
    isThere(socksUndies, 'socksUndies is required');
    isThere(accessories, 'accessories is required');
}

// Copied from /costs/clothes/calculations.
// TODO have that file reference this one.
const getTotalCo2 = (answers) => {
    checkIfAllFieldsPresent(answers);
    const { gender, size, shirts, jackets, shirtMaterial, pants, shorts, pantsMaterial, shoes, shoeType, socksUndies, accessories } = answers;
    const multiplier = getMultiplier(gender,size);
    const shirtsCo2 = Math.round(getShirtCo2(shirts, shirtMaterial) * multiplier);
    const jacketsCo2 = Math.round(getJacketCo2(jackets, shirtMaterial) * multiplier);
    const pantsCo2 = Math.round(getPantsCo2(pants, pantsMaterial) * multiplier);
    const shortsCo2 = Math.round(getShortsCo2(shorts, pantsMaterial) * multiplier);
    const socksUndiesCo2 = Math.round(getSocksUnderwearCo2(socksUndies) * multiplier);
    const accessoriesCo2 = Math.round(getAccessoriesCo2(accessories) * multiplier);
    const shoesCo2 = Math.round(getShoeCo2(shoes, shoeType) * multiplier);
    const totalCo2 = shirtsCo2 + jacketsCo2 + pantsCo2 + shortsCo2 + socksUndiesCo2 + accessoriesCo2 + shoesCo2;
    // The answers come in as strings ><
    const totalArticles = Math.round(shirts) + Math.round(jackets) + Math.round(pants) + Math.round(shorts) + Math.round(shoes) + Math.round(socksUndies) + Math.round(accessories);
    
    return { totalArticles, totalCo2, shirtsCo2, jacketsCo2, pantsCo2, shortsCo2, socksUndiesCo2, accessoriesCo2, shoesCo2 }
}

const getDataFromProfile = profile => {
    if(profile === 'Hardly any') {
        return profiles.lightest;
    } else if(profile === 'Just the essentials') {
        return profiles.light;
    } else if(profile === ids.aGoodAmount) {
        return profiles.medium;
    } else if(profile === ids.packedCloset) {
        return profiles.heavy;
    } else if(profile === 'Way too many') {
        return profiles.heaviest;
    } else {
        console.log('ERROR -- invalid answer for clothing profile question');
    }
}

export default ({
    clothingProfile
}) => {
    const profileData = getDataFromProfile(clothingProfile);
    const { totalArticles, totalCo2, shirtsCo2, jacketsCo2, pantsCo2, shortsCo2, socksUndiesCo2, accessoriesCo2, shoesCo2 } = getTotalCo2(profileData);
    const monthlyCo2 = convertLifetimeToMonthly(totalCo2, clothesLife);
    return { totalArticles, monthlyCo2, totalCo2, shirtsCo2, jacketsCo2, pantsCo2, shortsCo2, socksUndiesCo2, accessoriesCo2, shoesCo2 };
}
