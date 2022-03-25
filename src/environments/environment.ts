// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  VERSION: require('../../package.json').version,
  Parse: {
    serverURL: 'https://parseapi.back4app.com',
    applicationId: 'bcB6XClP4d8vJHIZvcEUvxjeZsviag4gjP48IIfD',
    jsKey: 'z46A36ynBeokVMbRjxxwO457t5t4o34lO58G9e4I',
    masterKey: 'Never_Put_real_masterKey'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
