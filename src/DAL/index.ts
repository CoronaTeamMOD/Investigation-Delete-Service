import { Pool } from 'pg';
import { config } from 'dotenv';
import { subDays } from 'date-fns';

import { deleteInvestigationsQuery } from './queries';
import { DeletingInvestigationsError } from '../Errors';

config();

const countiesBlackList: string[] = ['הכשרות', 'צוות הפרוייקט'];

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    max: +process.env.CONNECTIONS_COUNT
});

pool.on('connect', () => {
    console.log('initiated db connection pool');
});

export const deleteOldInvestigations = async (): Promise<void> => {
    try {
        console.log('executing DB query');
        await pool.query(deleteInvestigationsQuery(subDays(new Date(), +process.env.MIN_DAYS_TO_REMOVE), countiesBlackList));
    } catch (error) {
        throw new DeletingInvestigationsError(error);
    }
}