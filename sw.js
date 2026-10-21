var V='catcher-eval-v8-1';
var A=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
function net(req){return new Promise(function(res,rej){var t=setTimeout(rej,3000);fetch(req).then(function(r){clearTimeout(t);res(r)},function(e){clearTimeout(t);rej(e)})})}
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return Promise.all(A.map(function(u){return fetch(new Request(u,{cache:'reload'})).then(function(r){return c.put(u,r)})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
 e.respondWith(net(e.request).then(function(r){if(r&&r.ok){var cp=r.clone();caches.open(V).then(function(c){c.put(e.request,cp)})}return r}).catch(function(){return caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||caches.match('./index.html')})}));
});
