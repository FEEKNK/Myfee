// FILE: service-worker.js
// คำอธิบาย: จัดการ Caching เพื่อให้ใช้งาน Offline ได้
// Description: Service Worker for caching assets and enabling offline functionality.

const CACHE_NAME = 'my-fee-v4';

// รายชื่อไฟล์ที่ต้องการให้ Cache (รวมถึง CDN ภายนอกด้วย)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './logo.png',
  './style.css',
  './data/vocabulary.js',
  './manifest.json',
  './js/core/database.js',
  // External CDNs (FontAwesome, Fonts)
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Sarabun:wght@300;400;600&display=swap'
];

// ไฟล์ที่ต้องโหลดจากเน็ตก่อนเสมอ (Network First)
const NETWORK_FIRST = ['index.html', 'style.css'];

// 1. Install Event: ทำงานครั้งแรกเมื่อโหลดหน้าเว็บ -> สั่งให้ Cache ไฟล์ทั้งหมด
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  // skipWaiting บังคับให้ SW ตัวใหม่ทำงานทันที ไม่ต้องรอปิดหน้าเว็บ
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate Event: ทำงานเมื่อมีการอัปเดต SW -> ลบ Cache เก่าทิ้ง + claim clients ทันที
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
    }).then(() => {
      // Claim clients ทำให้ SW ตัวใหม่ควบคุมหน้าเว็บทันที
      return self.clients.claim();
    })
  );
});

// 3. Fetch Event: ใช้ Network First สำหรับ HTML/CSS, Cache First สำหรับที่เหลือ
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  const isNetworkFirst = NETWORK_FIRST.some(f => url.pathname.endsWith(f)) || url.pathname.endsWith('/');

  if (isNetworkFirst) {
    // Network First: โหลดจากเน็ตก่อน ถ้าเน็ตไม่มีค่อยดึง Cache
    e.respondWith(
      fetch(e.request).then((response) => {
        // อัปเดต Cache ด้วยเวอร์ชั่นล่าสุดจากเน็ต
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, responseClone);
        });
        return response;
      }).catch(() => {
        return caches.match(e.request);
      })
    );
  } else {
    // Cache First: ดึงจาก Cache ก่อน ถ้าไม่มีค่อยโหลดจากเน็ต
    e.respondWith(
      caches.match(e.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(e.request);
      })
    );
  }
});