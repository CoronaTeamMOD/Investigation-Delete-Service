import { CronJob } from 'cron';

import { deleteOldInvestigations } from './DAL';

new CronJob(process.env.CRON_JOB_TIMING, async () => {
    try {
        console.log('starting CRON job');
        await deleteOldInvestigations();
        console.log('finished CRON job')
    } catch (e) {
        console.error(e);
    }
}).start();