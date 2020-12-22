import { CronJob } from 'cron';

const job = new CronJob('* * * * * *', () => {
    console.log('hello from cron job');
});

job.start();