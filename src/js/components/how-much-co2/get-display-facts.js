import data from './how-much-co2-data';

const PERCENT_RANGE = .3; // 30% range for amounts

// Turned off upper limit.  Maybe turn it on later?
// const upperLimit = {
//     name: 'This footprint is huge',
//     description: 'Wow this is a lot!  I don\'t even have anything to compare this against.  In any case, you should probably change something or else say "my bad" when people talk about climate change.',
//     amount: 4000000
// };

const sortFacts = (co2, facts, numOfFacts) => {
    if(facts.length < numOfFacts) {
        return facts;
    }
    const sorted = facts.sort((a,b) => {
        return Math.abs(a.co2 - co2) > Math.abs(b.co2 - co2);
    });
    const reduced = sorted.slice(0,numOfFacts);
    return reduced.sort((a,b) => {
        return a.co2 > b.co2;
    })
}

export default (co2, excludeArray, numOfFacts) => {
    // Turned off upper limit.  Maybe turn it on later?
    // if( co2 > upperLimit.amount) {
    //     return [upperLimit]
    // }
    const facts = data.filter(fact => {
        return (
            fact.amount > (co2 * (1 - PERCENT_RANGE))) 
            && (fact.amount < (co2 * (1 + PERCENT_RANGE))
            && excludeArray.indexOf(fact.id) === -1
        )
    });
    return sortFacts(co2, facts, numOfFacts);
}