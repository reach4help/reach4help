import mapState from 'src/components/map-utils/map-state';

/* eslint-disable no-console */
export const debugLog = (...args: unknown[]) => {
  let text = '';
  args.forEach(arg => {
    text = `${Date()
      .toLocaleLowerCase()
      .substring(16, 24)} ms: ${new Date().getMilliseconds()} `;
    const isPrimitive = ['string', 'number', 'boolean', 'undefined'].includes(
      typeof arg,
    );
    if (isPrimitive) {
      text += `${arg} `;
    } else {
      if (text) {
        console.log(text, arg);
      } else {
        console.log(arg);
      }
      text = '';
    }
  });
  if (text) {
    console.log(`${text}`);
  }
};

export const debugMarkers = (msg: string) => {
  const { mapInfo } = mapState();
  debugLog(msg);
  debugLog(
    'clustering size',
    mapInfo?.clustering?.clusterMarkers.size,
    'clusterer total',
    mapInfo?.markerClusterer.getTotalClusters(),
    'markers',
    'clusterer getMarkers size',
    mapInfo?.markerClusterer.getMarkers().length,
  );
};

export const debugLogTimeStart = (startLabel: string, ...args: unknown[]) => {
  console.time(startLabel);
  debugLog(`Time log: Starting ${startLabel}`, ...args);
};

export const debugLogTimeEnd = (endLabel: string, ...args: unknown[]) => {
  console.timeEnd(endLabel);
  debugLog(`Time log: Ending ${endLabel}`, ...args);
};

export const debugLogTime = (timeLabel: string, ...args: unknown[]) => {
  console.timeLog(timeLabel);
  debugLog('Time log: Logging', ...args);
};
