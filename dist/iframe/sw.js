self.addEventListener("install", () => {
  console.log("installing...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("activating...");
  event.waitUntil(self.clients.claim());
});

importScripts("/js/iworker.js");
