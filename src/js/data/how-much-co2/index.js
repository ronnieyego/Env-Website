
import clothes from './clothes';
import constructionMaterials from './construction-materials';
import pets from './pets';
import thanksgivingDinner from './thanksgiving-dinner';
import roads from './roads';

export default {
    ...clothes,
    ...constructionMaterials,
    ...pets,
    ...roads,
    ...thanksgivingDinner
}