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
import msgr            from 'msgr'



const orN='color:orange;font-weight:normal;', orB='color:orange;font-weight:bold;', cyN='color:cyan;font-weight:normal;', unN='color:unset;font-weight:normal;', gnN='color:green;font-weight:normal;'
const timers = {}
let   channel = {}
const notificationCounter = {
  mainTimerSixtieth: 0
}
const clearAllTims = tmrs => Object.values(tmrs).forEach( el => clearInterval(el) )
const startTim = (tmrs, func, name, timeout) => {
  if (typeof tmrs[name]==='number') {
    clearInterval(tmrs[name])
  }
  tmrs[name] = setInterval(func, timeout, name)
}
const mainTimerFunc = async () =>  {
  if (notificationCounter.mainTimerSixtieth===60) {
    notificationCounter.mainTimerSixtieth = 0
    const title = 'The 60ᵗʰ tick!'
    const options = {
      body:'The sixtieth mainTimer tick has been successfully dispatched.',
      icon: `${process.env.PUBLIC_URL}/images/logo-512.png`,
      badge: `${process.env.PUBLIC_URL}/images/badge-128.png`,
      tag: 'mtSixty',
      actions:[
        {action:'cease-action',    title:'Stop',     icon:`${process.env.PUBLIC_URL}/images/stopIcon-128.png`    },
        {action:'settings-action', title:'Settings', icon:`${process.env.PUBLIC_URL}/images/settingsIcon-128.png`}
      ],
      timestamp: Date.now()
    }
//    event.waitUntil(self.registration.showNotification(title, options))
    self.registration.showNotification(title, options)
  }
  notificationCounter.mainTimerSixtieth++
  await channel.send('MAIN_TIMER_TICK')
}
const doStartMainTimer = async (timeout=1000) => startTim(timers, mainTimerFunc, 'mainTimer', timeout)
const startMainTimer = (timeout, respond) => doStartMainTimer(timeout).then( ()=>respond('(SW) Main timer started!') )
const doClearMainTimer = async () => {
  if (typeof timers['mainTimer']==='number') {
    clearInterval(timers['mainTimer'])
    return '(SW) Main timer cleared!'
  }
  return '(SW) Main timer not found, skipping clearing...'
}
const clearMainTimer = (data, respond) => doClearMainTimer().then( rslt=>respond(rslt) )

const startClientComms = () => {
  channel = msgr.worker({START_MAIN_TIMER:startMainTimer, CLEAR_MAIN_TIMER:clearMainTimer})
  if (!channel)  {
    console.warn(`%c[serviceWorker-custom.js/%cstartClientComms%c]:%c No channel found - skipping SW ⇄ App comms start!%c`, orB, cyN, orB, orN, unN)
  } else {
    channel.ready(()=>{})
  }
}

const handleInstall = ev => {
  self.skipWaiting()
}
const handleActivate = ev => {
  ev.waitUntil(clients.claim())
  startClientComms()
}

self.addEventListener('install',  handleInstall  )
self.addEventListener('activate', handleActivate )

//=================================================================================================================================================
/*

// eslint-env browser
'use strict'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() { // Delay registration until after the page has loaded, to ensure that our precaching requests don't degrade the first visit experience.
    navigator.serviceWorker.register('service-worker.js').then(function(reg) {
      reg.onupdatefound = function() {
        var installingWorker = reg.installing
        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
            case 'installed':
             console.log(navigator.serviceWorker.controller?'New or updated content is available.':'Content is now available offline!')
             break
            case 'redundant'
             console.error('The installing service worker became redundant.')
             break
          }
        }
      }
    }).catch(function(err) {
      console.error('Error during service worker registration:', err)
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
  var icon = `${process.env.PUBLIC_URL}/images/icon-192x192.png`
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
    for (var i=0; i<clientList.length; i++) {
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



const OFFLINE_VERSION = 1          // Incrementing OFFLINE_VERSION will kick off the install event and force previously cached resources to be updated from the network.
const CACHE_NAME = 'offline'
const OFFLINE_URL = 'offline.html' // Customize this with a different URL if needed.

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME)
    await cache.add(new Request(OFFLINE_URL, {cache: 'reload'})) // Setting {cache: 'reload'} in the new request will ensure that the response isn't fulfilled from the HTTP cache; i.e., it will be from the network.// Setting {cache: 'reload'} in the new request will ensure that the response isn't fulfilled from the HTTP cache; i.e., it will be from the network.
  })())
})

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    if ('navigationPreload' in self.registration) { // Enable navigation preload if it's supported.
      await self.registration.navigationPreload.enable()
    }
  })())
  self.clients.claim() // Tell the active service worker to take control of the page immediately.
})

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') { // We only want to call event.respondWith() if this is a navigation request for an HTML page.
    event.respondWith((async () => {       // If our if() condition is false, then this fetch handler won't intercept the request. If there are any other fetch handlers registered, they will get a chance to call event.respondWith(). If no fetch handlers call event.respondWith(), the request will be handled by the browser as if there were no service worker involvement.
      try {
        const preloadResponse = await event.preloadResponse // First, try to use the navigation preload response if it's supported.
        if (preloadResponse) { return preloadResponse }
        const networkResponse = await fetch(event.request)
        return networkResponse
      } catch (err) {
        console.log('Fetch failed; returning offline page instead.', err)
        const cache          = await caches.open(CACHE_NAME)
        const cachedResponse = await cache.match(OFFLINE_URL)
        return cachedResponse
      }
    })())
  }
})
*/



/*
Basic service-worker:
// Names of the two caches used in this version of the service worker. Change to v2, etc. when you update any of the local resources, which will in turn trigger the install event again.
const PRECACHE = 'precache-v1'
const RUNTIME  = 'runtime'

// A list of local resources we always want to be cached:
const PRECACHE_URLS = [
  'index.html',
  './',                    // <========Alias for index.html
  'styles.css',
  '../../styles/main.css',
  'demo.js'
]

// The install handler takes care of precaching the resources we always need:
self.addEventListener('install', event=>event.waitUntil( caches.open(PRECACHE).then(cache=>cache.addAll(PRECACHE_URLS)).then(self.skipWaiting()) ))

// The activate handler takes care of cleaning up old caches:
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME]
  event.waitUntil(caches.keys().then(cacheNames=>cacheNames.filter(cacheName=>!currentCaches.includes(cacheName))).then(cachesToDelete=>Promise.all(cachesToDelete.map(cacheToDelete=>caches.delete(cacheToDelete)))).then(()=>self.clients.claim()))
})

// The fetch handler serves responses for same-origin resources from a cache. If no response is found, it populates the runtime cache with the response from the network before returning it to the page:
self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) { // Skip cross-origin requests, like those for Google Analytics.
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) { return cachedResponse }
        return caches.open(RUNTIME).then(cache=>fetch(event.request).then(response=>cache.put(event.request,response.clone()).then(()=>response) // Put a copy of the response in the runtime cache.))
      })
    )
  }
})
*/

