import express from 'express';
import { CronJob } from 'cron';

import logger from './Logger';
import { Severity } from './Logger/types';
import { deleteOldInvestigations } from './DAL';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from investigation delete service!');
})

app.listen(+process.env.PORT, () => {

    new CronJob(process.env.CRON_JOB_TIMING, async () => {
        try {
            logger.info({
                step: 'starting CRON job',
                severity: Severity.LOW
            });
            await deleteOldInvestigations();
            logger.info({
                step: 'finished CRON job',
                severity: Severity.LOW
            });
        } catch (err) {
            logger.error({
                step: `error in deleteOldInestigation function: ${err}`,
                severity: Severity.HIGH
            })
        }
    }).start();

    logger.info({
        step: `Started Dummy HTTP server on port ${process.env.PORT}`,
        severity: Severity.LOW
    });
    
}).on('error', (err) => {
    logger.error({
        step: `Failed to setup Dummy HTTP server: ${err}`,
        severity: Severity.CRITICAL
    })
})