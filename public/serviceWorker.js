// see code from week 9
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/index.js",
  "/favicon.ico"
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1"

// On install, run this script
self.addEventListener("install", (evt) => {
  //tells the browser that work is ongoing until he promise settles
  evt.waitUntil(
    // opens the cache 'static-cache-v2'
    caches.open(CACHE_NAME).then(cache => {
      console.log("Your files were pre-cached sucessfully.");
      // caches documents from 'FILES TO CACHE'
      return cache.addAll(FILES_TO_CACHE);
    })
  )
  self.skipWaiting();
});

// On activation...
self.addEventListener("activate", (evt) => {
  //tells the browser that work is ongoing until he promise settles
  evt.waitUntil(
    // returns an array enumerable properties of the caches
    caches.keys().then(keyList => {
      // returns a single promise after all others have been fulfilled.
      return Promise.all(
        // maps over all keys in the keyList
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            //deletes key if above perameters are met
            return caches.delete(key);
          }
        })
      )
    })
  )
  self.clients.claim();
});

// on fetch...
self.addEventListener("fetch", (evt) => {
  // if the event includes an api call
  if (evt.request.url.includes("/api/")) {
    // logs the event
    console.log("[Service Worker] Fetch (data)", evt.request.url);
    //prevents the browser's default fetch handling, and allows for a promise-based response
    evt.respondWith(
      // opens data cache and then...
      caches.open(DATA_CACHE_NAME).then(cache => {
        // returns the fetch request
        return fetch(evt.request)
          .then(response => {
            // if the response came back good, clone it and store in the cache
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }
            return response;
          })
          // catch any errors
          .catch(err => {
            // if something went wrong, try to retrieve from the cache
            return cache.match(evt.request);
          })
      })
    );
    return;
  }
  // on event, this prevents the browser's default behavior and allows for a promise-based response
  evt.respondWith(
    // opens cache
    caches.open(CACHE_NAME).then(cache => {
      // attempts to retrieve the event request from our cache
      return cache.match(evt.request).then(response => {
        // either returns the response or calls a fetch
        return response || fetch(evt.request);
      })
    })
  )
});