// FILE: service-worker.js
// คำอธิบาย: จัดการ Caching เพื่อให้ใช้งาน Offline ได้
// Description: Service Worker for caching assets and enabling offline functionality.

const CACHE_NAME = 'my-fee-v3';

// รายชื่อไฟล์ที่ต้องการให้ Cache (รวมถึง CDN ภายนอกด้วย)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './logo.png',
  './style.css',
  './data/vocabulary.js',
  './manifest.json',
  './js/core/database.js',
  // External CDNs (Tailwind, FontAwesome, Fonts)

  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Sarabun:wght@300;400;600&display=swap'
];

// 1. Install Event: ทำงานครั้งแรกเมื่อโหลดหน้าเว็บ -> สั่งให้ Cache ไฟล์ทั้งหมด
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate Event: ทำงานเมื่อมีการอัปเดต SW -> ลบ Cache เก่าทิ้ง
self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Activate');
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 3. Fetch Event: ทำงานทุกครั้งที่มีการเรียกไฟล์ -> ดึงจาก Cache ก่อน ถ้าไม่มีค่อยโหลดเน็ต
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // ถ้ามีใน Cache ให้ใช้เลย
      if (response) {
        return response;
      }
      // ถ้าไม่มี ให้โหลดจากเน็ต
      return fetch(e.request);
    })
  );
});