import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"danotes-9104b","appId":"1:985871262609:web:176722cb541a685b9f3030","storageBucket":"danotes-9104b.appspot.com","apiKey":"AIzaSyCrG0oEx79RqU5FFPqeYT_nK4W9mVh5Tw0","authDomain":"danotes-9104b.firebaseapp.com","messagingSenderId":"985871262609"})), provideFirestore(() => getFirestore())]
};
