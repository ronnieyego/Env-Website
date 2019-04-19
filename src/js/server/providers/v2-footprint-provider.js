import footprintDao from '../daos/footprint-dao';

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
    
}