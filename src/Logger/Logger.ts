import { config } from 'dotenv';
const appinsights = require('applicationinsights');
import { createLogger, transports, format, Logger as WinstonLogger } from 'winston';

import { Environment, InitialLogMessage, LogType, MethodsLogMessage, Service, LogMessage } from './types';

config();

appinsights.setup(process.env.INSTRUMENTATION_KEY).start();

export class Logger {

    logger: WinstonLogger;
    workflow: string;

    constructor(workflow: string) {
        this.workflow = workflow; 
        this.logger = createLogger({
            transports: [
                new transports.Console()
            ],
            format: format.combine(
                format.timestamp(),
                format.printf(info => {
                    const initialLog: InitialLogMessage = { 
                        type: info.level as LogType, 
                        timestamp: new Date(info.timestamp).toLocaleString('he-IL') ,
                        environment: process.env.ENVIRONMENT as Environment,
                        workflow: this.workflow,
                        service: Service.INVESTIGATION_DELETE
                    };
                    const messageFromMethod: MethodsLogMessage = JSON.parse(JSON.stringify(info.message));
                    const outputLog: LogMessage = {
                        service: Service.SERVER,
                        ...initialLog,
                        ...messageFromMethod,
                    }
                    if (JSON.parse(process.env.SHOULD_POST_TO_AZURE)) {
                        this._postToAzure(outputLog);
                    }
                    return JSON.stringify(outputLog);
                })
            )
        });
    }

    _postToAzure(logMessage: LogMessage) {
        appinsights.defaultClient.trackEvent({
            name: logMessage.workflow + ', ' + logMessage.step,
            properties: logMessage
        })
    }
    
    warning(logMessage: MethodsLogMessage) {
        this.logger.warn(logMessage);
    }

    error(logMessage: MethodsLogMessage) {
        this.logger.error(logMessage);
    }

    info(logMessage: MethodsLogMessage) {
        this.logger.info(logMessage);
    }
}