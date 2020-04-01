import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  development: {
    apiKey: 'AIzaSyDU5FZEGBwU9lv5RxSQ4ObPPaqhX_PBnYk',
    authDomain: 'reach4help-dev.firebaseapp.com',
    databaseURL: 'https://reach4help-dev.firebaseio.com',
    projectId: 'reach4help-dev',
    storageBucket: 'reach4help-dev.appspot.com',
    messagingSenderId: '664078449280',
    appId: '1:664078449280:web:fad2c3b30771213e5f4465',
    measurementId: 'G-WFTRYNEQBB',
  },
  test: {
    apiKey: 'AIzaSyCIzCEMWDHtseNjDTdmXYu5SfpkeevIi9w',
    authDomain: 'reach4help-staging.firebaseapp.com',
    databaseURL: 'https://reach4help-staging.firebaseio.com',
    projectId: 'reach4help-staging',
    storageBucket: 'reach4help-staging.appspot.com',
    messagingSenderId: '836231829522',
    appId: '1:836231829522:web:d756d38b3783cffef0a0cb',
    measurementId: 'G-CZMWX6Y33C',
  },
  production: {
    apiKey: 'AIzaSyCYTBy2aERT_BPsasLAZMiGi95wNudDjSI',
    authDomain: 'reach4help-34372.firebaseapp.com',
    databaseURL: 'https://reach4help-34372.firebaseio.com',
    projectId: 'reach4help-34372',
    storageBucket: 'reach4help-34372.appspot.com',
    messagingSenderId: '618350193370',
    appId: '1:618350193370:web:1c174ff02ac1884a1d13e3',
    measurementId: 'G-KY24M2T0QQ',
  },
};

firebase.initializeApp(config.development);

export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
