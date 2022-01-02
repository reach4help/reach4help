/* eslint-disable no-console */
export const debugLog = (...args: any[]) => {
  let text = '';
  args.forEach(arg => {
    const isPrimitive = ['string', 'number', 'boolean', 'undefined'].includes(
      typeof arg,
    );
    if (isPrimitive) {
      text += `${arg} `;
    } else {
      if (text) {
        console.log(text, arg);
      } else {
        console.log(text, arg);
      }
      text = '';
    }
  });
  if (text) {
    console.log(`${text}`);
  }
};
