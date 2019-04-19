import footprintDao from '../daos/footprint-dao';
import MAP_DB from '../daos/map-db';

export const recordFootprint = async(req, res) => {
    const { results, questions } = req.body;
    if(!results || typeof results !== 'object' || !questions || questions.length === 0) {
        console.log('[ERROR] -  results and questions required to create a footprint');
        return res.status(200).send({ error: true, message: `Invalid input for footprint create.  Questions: ${questions}`});
    };

    const { monthlyCo2 } = results;
    const createFootprintResults = await footprintDao.createFootprint({ monthlyCo2, results })
        .catch(e => ({ error: true, message: `There was an uncaught error createFootprint.  Error: ${e}.`}))
    if(createFootprintResults.error) {
        console.log(`[ERROR] - ${createFootprintResults.message}`)
        return res.status(200).send(createFootprintResults);
    }
    const footprintId = createFootprintResults.results;
    const answers = questions
        .filter(question => typeof question.value !== 'undefined')
        .map(question => ([question.id, question.name, question.value]));
    
    const createAnswersResults = await footprintDao.createAnswers({ footprintId, answers })
        .catch(e => ({ error: true, message: `There was an uncaught error creating answers.  Error: ${e}.`}))
    if(createAnswersResults.error) {
        console.log(`[ERROR] - ${createAnswersResults.message}`)
        return res.status(200).send(createAnswersResults);
    }

    return res.status(200).send(createFootprintResults);
};

export const loadResultsPageData = async(footprintId) => {
    const footprintResults = await footprintDao.getFootprintById(footprintId)
        .then(footprint => MAP_DB(footprint.results.results))
        .catch(e => ({ error: true, message: `There was an uncaught error getting the footprint for footprintId ${footprintId}.  Error: ${e}.`}))
    
    if(footprintResults.error) {
        return {error: true, message: footprintResults.message};
    }

    const answersResults = await footprintDao.getAnswersByFootprintId(footprintId)
        .then(answers => answers.results.map(answer => MAP_DB(answer)))
        .catch(e => ({ error: true, message: `There was an uncaught error getting the answers  for footprintId ${footprintId}.  Error: ${e}.`}))
    if(answersResults.error) {
        return {error: true, message: answersResults.message};
    }

    const finalResults = {
        results: footprintResults,
        answers: answersResults
    }
    return finalResults;
}