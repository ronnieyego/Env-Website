import ids from '../../utils/ids/index';
import { co2PerPoundInAmerica } from '../../components/costs/aluminum/aluminum-data';
import { lbCo2PerLbSteel } from '../../components/costs/steel/steel-data';
// import * from '../../components/costs/aluminum/brick-data';

// From sheets.  See aluminum, steel, and bricks

export default {
    [ids.poundOfAluminum]: co2PerPoundInAmerica,
    //[ids.poundOfBrick]: ,
    [ids.poundOfSteel]: lbCo2PerLbSteel
}