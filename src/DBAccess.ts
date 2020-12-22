import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    max: +process.env.CONNECTIONS_COUNT
});

pool.on('acquire', () => {
    console.log('got connection from DB');
});

export const getInvestigationsToDeleteId = async (): Promise<number[]> => {
    const queryResult = await pool.query("SELECT epidemiology_number FROM investigation");
    return queryResult.rows;
};