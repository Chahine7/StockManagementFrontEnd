// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // CATEGORY URL
  categoryUrl : "http://localhost:8888/PRODUCT-SERVICE/categories",

  // PRODUCT URLS

  productUrl: "http://localhost:8888/PRODUCT-SERVICE/api/product",
  productListUrl: "http://localhost:8888/PRODUCT-SERVICE/products",

  // CUSTOMER URLS
  customerUrl: "http://localhost:8888/CLIENT-SERVICE/api/customer",
  customerListUrl: "http://localhost:8888/CLIENT-SERVICE/customers",

  // COUNTRY URLS
  countryUrl: "http://localhost:8888/CLIENT-SERVICE/countries",
  countryListUrl: "http://localhost:8888/CLIENT-SERVICE/api/country",

  // API KEY

  API_KEY : "9QTWoFzwxAPCAxdwt6daA6xfZSPqXP7s",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
