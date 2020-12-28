export enum Service {
    CLIENT = 'client',
    SERVER = 'server',
    INVESTIGATION_DELETE = 'investigation delete'
}

export enum Severity {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical'
}

export enum LogType {
    INFO = 'info',
    WARNING = 'warn',
    ERROR = 'error'
}

export enum Environment {
    LOCAL = 'local',
    DEV = 'dev',
    TEST = 'test',
    PROD = 'prod'
}

export interface InitialLogMessage {
    type: LogType;
    timestamp: string;
    environment: Environment;
    workflow: string;
    service: Service
}

export interface MethodsLogMessage {
    step: string;
    severity: Severity;
}

export type LogMessage = InitialLogMessage & MethodsLogMessage;