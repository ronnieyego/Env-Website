import ids from '../../utils/ids/index';
import {
    getShirtCo2,
    getJacketCo2,
    getPantsCo2,
    getShortsCo2,
    getShoeCo2
} from '../../components/footprint-form/calculations/clothes';

const round = num => Math.round(num * 10)/10;

export default  {
    [ids.oneJacket]: round(getJacketCo2(1, 'Leather')),
    [ids.oneShirt]: round(getShirtCo2(1, 'Cotton')),
    [ids.oneJean]: round(getPantsCo2(1, 'Mostly demin')),
    [ids.oneShort]: round(getShortsCo2(1, 'Mostly synthetic')),
    [ids.onePairOfBoots]: round(getShoeCo2(1, 'Boots')),
    [ids.onePairOfSneakers]: round(getShoeCo2(1, 'Sneakers'))
};
