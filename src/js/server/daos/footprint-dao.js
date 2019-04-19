import Pool from './config';
import Q from 'q';
import uuidv4 from 'uuid/v4';
import format from 'pg-format';


const createFootprint = async({ monthlyCo2, results }) => {
    const promise = Q.defer();
    Pool.query(
        `INSERT INTO footprints.footprint (footprint_id, monthly_co2, results) VALUES
        ($1, $2, $3)
        RETURNING footprint_id`
        , [uuidv4(), monthlyCo2, results], (error, result) => {
        if (error) {
            return promise.resolve({ error: true, message: `[ERROR] - Failed to create a footprint for monthlyCo2: ${monthlyCo2}.  Error: ${error}` });
        }
        return promise.resolve({ error: false, results: result.rows[0].footprint_id });
    })
    return promise.promise;
};

const createAnswers = async({ footprintId, answers }) => {
    const answersWithFootprintId = answers.map(answer => {
        answer.unshift(uuidv4(), footprintId);
        return answer;
    });
    
    // answer shape [answerId, footprintId, questionId, questionName, value]
    const promise = Q.defer();
    Pool.query(
        format(
            `INSERT INTO footprints.answers (answer_id, footprint_id, question_id, question_name, value) VALUES
            %L;`, answersWithFootprintId
        ), [], (error, result) => {
        if (error) {
            return promise.resolve({ error: true, message: `[ERROR] - Failed to add answers for footprintId: ${footprintId}.  Error: ${error}` });
        }
        
        return promise.resolve({ error: false, results: true });
    })
    return promise.promise;
};

const getFootprintById = async(footprintId) => {
    const promise = Q.defer();
    Pool.query(
            `SELECT footprint_id, monthly_co2, results, created_dtm
            FROM footprints.footprint 
            WHERE footprint_id = $1;
        `, [footprintId], (error, result) => {
        if (error) {
            return promise.resolve({ error: true, message: `[ERROR] - Failed to find footprint for footprintId: ${footprintId}.  Error: ${error}` });
        }
        if(!result.rows || result.rows.length === 0) {
            return promise.resolve({ error: true, message: `Could not find footprint for footprintId: ${footprintId}.` });
        }
        return promise.resolve({ error: false, results: result.rows[0] });
    })
    return promise.promise;
};

const getAnswersByFootprintId = async(footprintId) => {
    const promise = Q.defer();
    Pool.query(
            `SELECT answer_id, question_id, question_name, value
            FROM footprints.answers 
            WHERE footprint_id = $1   
        ;`, [footprintId], (error, result) => {
        if (error) {
            return promise.resolve({ error: true, message: `[ERROR] - Failed to find answers for footprintId: ${footprintId}.  Error: ${error}` });
        }
        if(!result.rows || result.rows.length === 0) {
            return promise.resolve({ error: true, message: `Could not find answers for footprintId: ${footprintId}.` });
        }
        return promise.resolve({ error: false, results: result.rows });
    })
    return promise.promise;
};

module.exports = { 
    createFootprint,
    createAnswers,
    getFootprintById,
    getAnswersByFootprintId
}; 