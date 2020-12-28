import { Pool } from 'pg';
import { config } from 'dotenv';
import { subDays } from 'date-fns';

import logger from '../Logger';
import { Severity } from '../Logger/types';

import { deleteInvestigationsQuery } from './queries';
import { DeletingInvestigationsError } from '../Errors';

config();

const countiesBlackList: string[] = ['הכשרות', 'צוות הפרוייקט'];

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    max: +process.env.CONNECTIONS_COUNT
});

pool.on('connect', () => {
    logger.info({
        step: 'initiated db connection pool',
        severity: Severity.LOW
    });
});

export const deleteOldInvestigations = async (): Promise<void> => {
    try {
        logger.info({
            step: 'executing DB query to delete investigations',
            severity: Severity.LOW
        });
        await pool.query(deleteInvestigationsQuery(subDays(new Date(), +process.env.MIN_DAYS_TO_REMOVE), countiesBlackList));
        logger.info({
            step: 'finished deleting investigations successfully',
            severity: Severity.LOW
        });
    } catch (error) {
        throw new DeletingInvestigationsError(error);
    }
}