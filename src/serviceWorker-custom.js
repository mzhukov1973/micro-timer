/*React************************************************************************/
/*  Copyright 2020 Maxim Zhukov                                               */
/*                                                                            */
/*  Licensed under the Apache License, Version 2.0 (the "License");           */
/*  you may not use this file except in compliance with the License.          */
/*  You may obtain a copy of the License at                                   */
/*                                                                            */
/*      http://www.apache.org/licenses/LICENSE-2.0                            */
/*                                                                            */
/*  Unless required by applicable law or agreed to in writing, software       */
/*  distributed under the License is distributed on an "AS IS" BASIS,         */
/*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  */
/*  See the License for the specific language governing permissions and       */
/*  limitations under the License.                                            */
/******************************************************************************/
import msgr from 'msgr'
const orN = 'color:orange;font-weight:normal;'
const orB = 'color:orange;font-weight:bold;'
const unN = 'color:unset;font-weight:normal;'

//console.log(`%c[serviceWorker-custom.js]:%c Executed (2)!%c`,orB,orN,unN)

self.addEventListener('install', event=>self.skipWaiting())
self.addEventListener('activate', event=>event.waitUntil(clients.claim()))

const doCaching = async url => console.log(`%c[serviceWorker-custom.js]:%c ...done caching '${url}'!%c`,orB,orN,unN)
const cacheAsset = (url,respond) => doCaching(url).then(()=>respond(`(sw says): Caching complete for url='${url}'!`))

//const channel = msgr.worker({CACHE_ASSET:cacheAsset})

const startClientComms = () => {
////  channel.receive(data=>console.log(`%c[serviceWorker-custom.js]:%c Message received on the channel, payload is: %c%o`,orB,orN,unN, data))
}
//channel.ready(startClientComms)

/*

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)




export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}




function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}




function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}




export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}



*/


//=================================================================================================================================================


/*

// eslint-env browser
'use strict'

if ('serviceWorker' in navigator) {
// Delay registration until after the page has loaded, to ensure that our precaching requests don't degrade the first visit experience. See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
  window.addEventListener('load', function() {
// Your service-worker.js *must* be located at the top-level directory relative to your site. It won't be able to control pages unless it's located at the same level or higher than them. *Don't* register service worker file in, e.g., a scripts/ sub-directory! See https://github.com/slightlyoff/ServiceWorker/issues/468
    navigator.serviceWorker.register('service-worker.js').then(function(reg) {
// updatefound is fired if service-worker.js changes.
      reg.onupdatefound = function() {
// The updatefound event implies that reg.installing is set; see https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
        var installingWorker = reg.installing

        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // At this point, the old content will have been purged and the fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is available; please refresh." message in the page's interface.
                console.log('New or updated content is available.')
              } else {
                // At this point, everything has been precached. It's the perfect time to display a "Content is cached for offline use." message.
                console.log('Content is now available offline!')
              }
              break

            case 'redundant'
              console.error('The installing service worker became redundant.')
              break
          }
        }
      }
    }).catch(function(e) {
      console.error('Error during service worker registration:', e)
    })
  })
}


*/




/*
Sample from Push messages & Notifications:
//-------------------------------------------------------
'use strict'

self.addEventListener('push', function(event) {
  console.log('Received a push message', event)

  var title = 'Yay a message.'
  var body = 'We have received a push message.'
  var icon = '/images/icon-192x192.png'
  var tag = 'simple-push-demo-notification-tag'

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag
    })
  )
})

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag)
// Android doesn’t close the notification when you click on it See: http://crbug.com/463146
  event.notification.close()

// This looks to see if the current is already open and focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i]
      if (client.url === '/' && 'focus' in client) {
        return client.focus()
      }
    }
    if (clients.openWindow) {
      return clients.openWindow('/')
    }
  }))
})
*/


/*
Custom offline page service worker:


// Incrementing OFFLINE_VERSION will kick off the install event and force previously cached resources to be updated from the network.
const OFFLINE_VERSION = 1
const CACHE_NAME = 'offline'
// Customize this with a different URL if needed.
const OFFLINE_URL = 'offline.html'

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME)
// Setting {cache: 'reload'} in the new request will ensure that the response isn't fulfilled from the HTTP cache; i.e., it will be from the network.
    await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}))
  })())
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
// Enable navigation preload if it's supported. See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable()
    }
  })())

// Tell the active service worker to take control of the page immediately.
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
// We only want to call event.respondWith() if this is a navigation request for an HTML page.
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
// First, try to use the navigation preload response if it's supported.
        const preloadResponse = await event.preloadResponse
        if (preloadResponse) {
          return preloadResponse
        }

        const networkResponse = await fetch(event.request)
        return networkResponse
      } catch (error) {
// catch is only triggered if an exception is thrown, which is likely due to a network error. If fetch() returns a valid HTTP response with a response code in the 4xx or 5xx range, the catch() will NOT be called.
        console.log('Fetch failed; returning offline page instead.', error)

        const cache = await caches.open(CACHE_NAME)
        const cachedResponse = await cache.match(OFFLINE_URL)
        return cachedResponse
      }
    })())
  }

// If our if() condition is false, then this fetch handler won't intercept the request. If there are any other fetch handlers registered, they will get a chance to call event.respondWith(). If no fetch handlers call
// event.respondWith(), the request will be handled by the browser as if there were no service worker involvement.
})
*/



/*
Basic service-worker:
// Names of the two caches used in this version of the service worker. Change to v2, etc. when you update any of the local resources, which will in turn trigger the install event again.
const PRECACHE = 'precache-v1'
const RUNTIME = 'runtime'

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  'index.html',
  './', // Alias for index.html
  'styles.css',
  '../../styles/main.css',
  'demo.js'
]

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  )
})

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME]
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName))
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete)
      }))
    }).then(() => self.clients.claim())
  )
})

// The fetch handler serves responses for same-origin resources from a cache. If no response is found, it populates the runtime cache with the response from the network before returning it to the page.
self.addEventListener('fetch', event => {
// Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response
            })
          })
        })
      })
    )
  }
})
*/

