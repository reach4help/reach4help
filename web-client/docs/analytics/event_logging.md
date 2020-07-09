# Logging Events

## Summary
This document should guide you through the minimal steps, along with some best practices, you require to log events in different situations, for example when a user clicks a button. 

## Usage and Guidance
We are using Firebase Analytics to track events triggered in our app. Firebase Analytics uses `gtag.js` behind the hood and they point us to use these [docs](https://developers.google.com/gtagjs/reference/parameter) as a reference to the parameters we can pass to the `analytics.logEvent` method. 

```js
analytics.logEvent('select_content', {
  content_type: 'image',
  content_id: 'P12453',
  items: [{ name: 'Kittens' }]
});
```

It's important to have defined categories and funnels so we can easily track the events and metrics they generate:

**(INSERT CATEGORIES DISCUSSED BY LEADERSHIP/MARKETING HERE)**

Every action the user takes in our app should be tracked in order for us to have enough data to create a better product but there are important best practices we have to comply to:

**User data should be completely anonymised**
**Insert other best practices here**
