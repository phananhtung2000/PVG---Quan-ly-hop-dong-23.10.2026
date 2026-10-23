/* Service worker - Quản lý hợp đồng khách hàng (PVG)
   Chỉ cache tài nguyên tĩnh của app shell. Không đụng tới localStorage/IndexedDB.
   Cập nhật phiên bản: đổi v1 -> v2 bên dưới. */
const PREFIX = 'pvg-hopdong-cache-';
const CACHE_NAME = PREFIX + 'v1';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-512-maskable.png'];
/* App không gọi thư viện CDN nào (SheetJS, ExcelJS, JSZip đã nhúng sẵn trong index.html) */

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(function (c) { return c.addAll(ASSETS); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(names.filter(function (n) { return n.startsWith(PREFIX) && n !== CACHE_NAME; })
        .map(function (n) { return caches.delete(n); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.open(CACHE_NAME).then(function (c) { return c.match(req); }).then(function (hit) {
      if (hit) return hit;
      return fetch(req).catch(function () {
        return caches.open(CACHE_NAME).then(function (c) { return c.match('./index.html'); });
      });
    })
  );
});
