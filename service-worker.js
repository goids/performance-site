const CACHE_NAME = 'app-v1'

self.addEventListener('fetch', myCustomFetch)
self.addEventListener('activate', clearCache)

function myCustomFetch(event) {
  const response = cacheOrFetch(event)
  event.respondWith(response)
}

async function cacheOrFetch(event) {
  // event.request contiene la información del request ejemplo: url
  let response = await caches.match(event.request)
  // si es cierto, retornamos la respuesta desde la cache
  if (response) return response
  // si no, hacemos un fetch al servidor para obtener la respuesta
  response = await fetch(event.request)

  if (
    !response ||
    response.status !== 200 ||
    response - type !== 'basic' ||
    !isAssetCss(event.request.url)
  ) {
    return response
  }
  // cuando tengamos la respuesta devuelta del servidor la almacenamos en la cache
  const clonedResponse = response.clone()
  caches.open(CACHE_NAME).then(cache => {
    cache.put(event.request, clonedResponse)
  })

  return response
}

const assetsRegExp = /.png|.gif|.jpg|.jpeg|.css|.js/g

function isAssetCss(url) {
  return assetsRegExp.test(url)
}

function clearCache(event) {
  const deletePromise = caches.delete(CACHE_NAME)
  event.waitUntil(deletePromise)
}
