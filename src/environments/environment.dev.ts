import { IEnvironment } from './environment.definitions';

// Deves környezet
export const environment: IEnvironment = {
  firebase: {
    projectId: 'pet-project-d012d',
    appId: '1:547836476438:web:b7a48c14d58366cd670937',
    databaseURL: 'https://pet-project-d012d-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'pet-project-d012d.appspot.com',
    apiKey: 'AIzaSyD3GqaJ8Nj1vhZJRarwc2zq-22tTEGEd4Q',
    authDomain: 'pet-project-d012d.firebaseapp.com',
    messagingSenderId: '547836476438',
  },
  production: false,
  type: 'dev',
  httpReqTimeout: 30,
};
