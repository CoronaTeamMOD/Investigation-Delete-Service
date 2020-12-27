import { CronJob } from 'cron';

import logger from './Logger';
import { Severity } from './Logger/types';
import { deleteOldInvestigations } from './DAL';

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