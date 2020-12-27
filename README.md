# Investigation Auto Delete Service 🧨

This service is a cron job that it's purpose is deleting investigations that are
completed and haven't been touched for at least 60 days. <br />

initiate the environment variables that are mentioned in the .env-sample with the values you need:
* CONNECTION_STRING = connection string to the DB structured by this npm package readme [pg-connection-string readme](https://github.com/brianc/node-postgres/tree/master/packages/pg-connection-string)
* CONNECTIONS_COUNT = the connection count you want to the DB
* MIN_DAYS_TO_REMOVE = the minimum days count in order to delete an investigation
* CRON_JOB_TIMING = timing string to the cron job using [this guide](https://support.acquia.com/hc/en-us/articles/360004224494-Cron-time-string-format)
<br />
Good Luck! 😀