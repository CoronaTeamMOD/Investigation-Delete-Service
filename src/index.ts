import { CronJob } from 'cron';

import { getInvestigationsToDeleteId, deleteOldInvestigations } from './DBAccess';

const job = new CronJob('* * * * * *', async () => {
    console.log('hello from cron job');
    const epidemioogyNumbersToDelete = await getInvestigationsToDeleteId();
    deleteOldInvestigations(epidemioogyNumbersToDelete);
});

job.start();