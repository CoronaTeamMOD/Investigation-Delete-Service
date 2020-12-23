import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    max: +process.env.CONNECTIONS_COUNT
});

pool.on('connect', () => {
    console.log('got connection to the DB');
});

export const getInvestigationsToDeleteId = async (): Promise<number[]> => {
    const queryResult = await pool.query<{epidemiology_number: number}>("SELECT epidemiology_number FROM investigation");
    return queryResult.rows.map(result => result.epidemiology_number);
};

export const deleteOldInvestigations = async (epidemiologyNumbers: number[]): Promise<void> => {
    await Promise.all(epidemiologyNumbers.map(epidemiologyNumber => pool.query(`SELECT delete_investigation(${epidemiologyNumber});`)))
}