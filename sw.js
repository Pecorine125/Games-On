// sw.js - Service Worker para Cache Dinâmico
const CACHE_NAME = 'games-launcher-cache-v2';

// Instalação do SW: Ativação imediata sem esperar o fechar das abas
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Limpeza de caches antigos quando a versão do CACHE_NAME muda
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Apagando cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercepta requisições
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Aceita apenas requisições GET
  if (request.method !== 'GET') return;

  // Ignora extensões de navegação do Chrome/Browser para evitar exceções
  if (request.url.startsWith('chrome-extension://')) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // 1. Retorna do Cache se já existir
      if (cachedResponse) {
        return cachedResponse;
      }

      // 2. Tenta buscar da rede
      return fetch(request)
        .then((networkResponse) => {
          // Validação flexibilizada:
          // Permite status 200 (mesmo domínio) OU type 'opaque' (status 0 para CDNs externas)
          const isValidResponse = networkResponse && (
            networkResponse.status === 200 || 
            networkResponse.type === 'opaque'
          );

          if (!isValidResponse) {
            return networkResponse;
          }

          // Clona a resposta e armazena no cache
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return networkResponse;
        })
        .catch((err) => {
          console.warn('[SW] Falha ao buscar recurso offline:', request.url, err);
          // Retorna fallback ou nada se estiver offline e não houver cache
          return cachedResponse;
        });
    })
  );
});