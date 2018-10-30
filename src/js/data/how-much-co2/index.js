
import clothes from './clothes';
import constructionMaterials from './construction-materials';
import pets from './pets';
import roads from './roads';

console.log('CLOTHES ARE', clothes);

export default {
    ...clothes,
    ...constructionMaterials,
    ...roads,
    ...pets
}