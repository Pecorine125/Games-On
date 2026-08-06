// service-worker.js

const NOME_DO_CACHE = 'meu-site-offline-v1';

// Liste todos os arquivos da sua página aqui:
const ARQUIVOS_PARA_CACHE = [
  './',
  './index.html',
  './style.css',      // Troque pelo nome exato do seu arquivo CSS
  './script.js',     // Troque pelo nome do seu 1º arquivo JS
  './sw.js'      // Troque pelo nome do seu 2º arquivo JS
];

// 1. Quando o site abre pela primeira vez, salva os arquivos no navegador
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(NOME_DO_CACHE).then((cache) => {
      console.log('Arquivos salvos no cache para uso offline!');
      return cache.addAll(ARQUIVOS_PARA_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. Limpa caches antigos quando você atualizar o site no futuro
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== NOME_DO_CACHE) {
            console.log('Removendo cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Quando ficar sem internet, busca os arquivos salvos no cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((respostaSalva) => {
      // Se encontrou o arquivo no cache, entrega ele. Se não, tenta buscar na internet.
      return respostaSalva || fetch(event.request);
    })
  );
});