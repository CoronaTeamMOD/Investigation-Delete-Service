import { Pool } from 'pg';
import { config } from 'dotenv';
import { subDays } from 'date-fns';

import { deleteInvestigationsQuery } from './queries';
import { DeletingInvestigationsError } from '../Errors';

config();

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    max: +process.env.CONNECTIONS_COUNT
});

pool.on('connect', () => {
    console.log('got connection to the DB');
});

pool.on('error', (err) => {
    console.log('got error from DB: ' + err);
})

export const deleteOldInvestigations = async (): Promise<void> => {
    try {
        await pool.query(deleteInvestigationsQuery(subDays(new Date(), +process.env.MIN_DAYS_TO_REMOVE)))
    } catch (error) {
        throw new DeletingInvestigationsError(error);
    }
}