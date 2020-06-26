import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';

export const enableLogger = () => {
  datadogLogs.init({
    clientToken: `${process.env.REACT_APP_DATADOG_LOGS_CLIENT_TOKEN}`,
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

export const enableMonitoring = () => {
  datadogRum.init({
    applicationId: `${process.env.REACT_APP_DATADOG_APP_ID}`,
    clientToken: `${process.env.REACT_APP_DATADOG_RUM_CLIENT_TOKEN}`,
    sampleRate: 100,
    trackInteractions: true,
  });
};
