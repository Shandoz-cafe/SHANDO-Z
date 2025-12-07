self.addEventListener("install", e=>{
  self.skipWaiting();
});

self.addEventListener("fetch", event=>{
  event.respondWith(
    caches.open("shandoz-cache").then(async cache=>{
      const res = await fetch(event.request).catch(()=> null);
      if(res) cache.put(event.request, res.clone());
      return res || cache.match(event.request);
    })
  );
});
