import { CronJob } from 'cron';

import { deleteOldInvestigations } from './DAL';

new CronJob(process.env.CRON_JOB_TIMING, async () => {
    console.log('hello from cron job');
    try {
        await deleteOldInvestigations();
    } catch (e) {
        console.error(e);
    }
}).start();