# Investigation Auto Delete Service 🧨

This service is a cron job that it's purpose is deleting investigations that are
completed and haven't been touched for at least 60 days.

## Getting started
After youv'e installed the packages and configured all the environment variables like the [Configuration](#configuration) section explains run
```shell 
npm start
```
and the service have been initiated!

## Developing

### Built With
* cron
* pg for node 

### Prerequisites
* Node 
* Git

### Setting up Dev
Clone the project and install the dependencies using the following commands
```shell
git clone https://github.com/CoronaTeamMOD/Investigation-Delete-Service.git
cd Investigation-Delete-Service/
npm install
```

## Configuration
initiate the environment variables that are mentioned in the .env-sample with the values you need:
* CONNECTION_STRING = connection string to the DB structured by this npm package readme [pg-connection-string readme](https://github.com/brianc/node-postgres/tree/master/packages/pg-connection-string)
* CONNECTIONS_COUNT = the connection count you want to the DB
* MIN_DAYS_TO_REMOVE = the minimum days count in order to delete an investigation
* CRON_JOB_TIMING = timing string to the cron job using [this guide](https://support.acquia.com/hc/en-us/articles/360004224494-Cron-time-string-format)
<br />
Good Luck! 😀