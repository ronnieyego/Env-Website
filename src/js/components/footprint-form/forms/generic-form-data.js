import ids from '../../../utils/ids/index';
import { 
    HomeFormValidator,
    HomeUtilitiesValidator
} from '../../../actions/footprint/validators/index';

export default {
    HOME_FORM: {
        questionOrder: [
            ids.userState,
            ids.homeType,
            ids.homeSqft,
            ids.homeMaterial,
            ids.liveWith
        ],
        questionFormName: 'household-home',
        headerText: 'Your home is one of the largest carbon costs in your life.  Answering the following questions will let you discover exactly how much.',
        step: 1,
        validator: HomeFormValidator
    },
    HOME_ACTIVITY_FORM: {
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
        headerText: 'The following questions will help determine how much you use.',
        step: 2,
        validator: HomeUtilitiesValidator
    }
};