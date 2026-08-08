// sw.js - Service Worker Otimizado para Launcher de Jogos
const CACHE_NAME = 'games-launcher-v3';

// Arquivos do App Shell a serem pré-carregados no Install
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

// 1. INSTALAÇÃO: Pré-carrega o App Shell
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pré-carregando App Shell');
      return cache.addAll(APP_SHELL);
    })
  );
});

// 2. ATIVAÇÃO: Limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Removendo cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. INTERCEPTAÇÃO DE REQUISIÇÕES
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Filtro 1: Aceita apenas requisições GET
  if (request.method !== 'GET') return;

  // Filtro 2: Ignora extensões do navegador e requisições chrome-extension
  if (url.protocol === 'chrome-extension:') return;

  // Filtro 3: Ignora requisições dentro do IFRAME dos jogos (Evita estouro de memória/quota)
  // Se a requisição for para páginas/assets de terceiros que não sejam imagens de capa, deixa a rede carregar direto
  const isImageRequest = request.destination === 'image' || url.pathname.match(/\.(png|jpg|jpeg|webp|gif|svg)$/i);
  const isSameOrigin = url.origin === self.location.origin;

  // Se for navegação de iframe ou recurso externo que NÃO seja imagem, passa direto sem salvar no Cache
  if (!isSameOrigin && !isImageRequest) {
    return; // O navegador cuida do carregamento padrão via rede
  }

  // ESTRATÉGIA A: Imagens de Capa e CDNs (Cache-First com Fallback de Rede)
  if (isImageRequest) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(request).then((networkResponse) => {
          const isValidResponse = networkResponse && (
            networkResponse.status === 200 || networkResponse.type === 'opaque'
          );

          if (isValidResponse) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        }).catch(() => {
          // Imagem offline indisponível
          return new Response('', { status: 404, statusText: 'Offline Image Unavailable' });
        });
      })
    );
    return;
  }

  // ESTRATÉGIA B: App Shell Local (Stale-While-Revalidate)
  // Serve do cache imediatamente e atualiza silenciosamente pela rede para a próxima visita
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});