import ids from '../../../utils/ids/index';
import { STEPS } from './utils';
import { 
    HomeFormValidator,
    HomeUtilitiesValidator,
    HomeTemperatureValidator,
    StuffValidator
} from '../../../actions/footprint/validators/index';

export default {
    HOME_FORM: {
        title: 'Home',
        questionOrder: [
            ids.userState,
            ids.userZip,
            ids.homeType,
            ids.homeSqft,
            ids.homeMaterial,
            ids.liveWith
        ],
        questionFormName: 'household-home',
        headerText: 'Your home is one of the largest carbon costs in your life.  It takes significant CO2 to build and operate your home.',
        step: STEPS.home,
        validator: HomeFormValidator
    },
    HOME_ACTIVITY_FORM: {
        title: 'Home Activites',
        questionOrder: [
            ids.hoursAtHome,
            ids.tvWatchHours,
            ids.hoursComputer,
            ids.cookingFrequency,
            ids.showEveryday,
            ids.playMusicHome,
            ids.laundryMonth,
        ],
        questionFormName: 'household-activities',
        headerText: 'These questions will help determine your electricity useage.',
        step: STEPS.homeActivities,
        validator: HomeUtilitiesValidator
    },
    HOME_TEMPERATURE_FORM: {
        title: 'Heating and Cooling',
        questionOrder: [
            ids.homeInsulation,
            ids.summerTemp,
            ids.coolingSystem,
            ids.coolWholeHouse,
            ids.usesFan,
            ids.winterTemp,
            ids.heatingSystem,
            ids.heatWholeHouse,
            ids.usesPortableHeater
        ],
        questionFormName: 'household-temperature',
        headerText: 'Heating and cooling usually compromise the majority of household CO2.',
        step: STEPS.heatingCooling,
        validator: HomeTemperatureValidator
    },
    STUFF_FORM: {
        title: 'Possessions',
        questionOrder: [
            ids.totalHouseFurniture,
    ids.totalWardrobe,
    ids.allPets,
    ids.houseClutter
        ],
        questionFormName: 'stuff-home',
        headerText: 'Everything produces CO2.  This form will estimate the major buckets of stuff that you have.',
        step: STEPS.stuff,
        validator: StuffValidator
    },
};