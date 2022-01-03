// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  host: window["env"]["host"] || "https://heckle.holzeis.me",
  api: window["env"]["api"] || "/api/v1",
  socket: window["env"]["socket"] || "wss://heckle.holzeis.me/ws",
  publicKey: window["env"]["publicKey"] || "BOM4o3Nx3YUHTf7PRNq-64yv5zOYEx2LURv-TshyusKL_hnBuv0jFolhQAKWiYPuwFxMBhl1Oec9q8qoyAW8Qbk",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
