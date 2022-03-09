export const getPosition = () => new Promise((resolve, reject) =>
  navigator.geolocation.getCurrentPosition(resolve, reject),
);
