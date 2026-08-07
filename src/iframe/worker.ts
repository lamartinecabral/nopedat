/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

const resources = new Map();

self.addEventListener("message", (event) => {
  if (event.data?.type === "resource") {
    resources.set(event.data.name, event.data);
  }
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (resources.has(url.href)) {
    console.log("fetch intercepted by worker successfully");
    const data = resources.get(url.href);
    event.respondWith(
      new Response(data.content, {
        headers: { "Content-Type": data.contentType || "text/html" },
      }),
    );
  }
});
