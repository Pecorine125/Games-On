// sw.js - Service Worker para Cache Dinâmico por Jogo
const CACHE_NAME = 'games-launcher-cache-v1';

// Intercepta todas as requisições de rede (incluindo as feitas dentro do iframe)
self.addEventListener('fetch', (event) => {
  // Ignora requisições que não sejam GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Se já está no cache, retorna o arquivo salvo (carregamento instantâneo)
        return cachedResponse;
      }

      // Se não está no cache, faz o download e armazena uma cópia
      return fetch(event.request).then((networkResponse) => {
        // Valida se a resposta é válida antes de armazenar
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Caso esteja offline e não haja cache
        return cachedResponse;
      });
    })
  );
});