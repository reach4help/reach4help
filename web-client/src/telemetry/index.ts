import { datadogLogs } from '@datadog/browser-logs';

export const enableLogger = () => {
  datadogLogs.init({
    clientToken: `${process.env.REACT_APP_DATADOG_CLIENT_TOKEN}`,
    forwardErrorsToLogs: true,
    sampleRate: 100,
  });
};

export const logInfo = (message: string, context?: {}) => {
  datadogLogs.logger.info(message, context);
};

export const logError = (message: string, context?: {}) => {
  datadogLogs.logger.error(message, context);
};
