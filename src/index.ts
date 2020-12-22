import { CronJob } from 'cron';

import { getInvestigationsToDeleteId } from './DBAccess';

const job = new CronJob('* * * * * *', async () => {
    console.log('hello from cron job');
    console.log(await getInvestigationsToDeleteId())
});

job.start();