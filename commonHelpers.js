import{i as d,a as h,S as g}from"./assets/vendor-fd6d9c43.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const b=document.getElementById("search-form"),l=document.querySelector(".gallery"),i=document.querySelector(".load-more"),L="40880648-0c49830a119af18016c24c7ec",E="https://pixabay.com/api/",f=40;let a=1,u="";i.style.display="none";const m=async(t,r)=>{try{return(await h.get(E,{params:{key:L,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:f}})).data}catch(s){return console.error("Error fetching images:",s),null}},p=t=>{if(l.innerHTML="",t.length===0){d.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again."});return}t.forEach(s=>{const n=document.createElement("a");n.href=s.largeImageURL,n.classList.add("photo-card");const e=document.createElement("img");e.src=s.webformatURL,e.alt=s.tags,e.loading="lazy";const o=document.createElement("div");o.classList.add("info"),o.innerHTML=`
      <p class="info-item"><b>Likes:</b> ${s.likes}</p>
      <p class="info-item"><b>Views:</b> ${s.views}</p>
      <p class="info-item"><b>Comments:</b> ${s.comments}</p>
      <p class="info-item"><b>Downloads:</b> ${s.downloads}</p>
    `,n.appendChild(e),n.appendChild(o),l.appendChild(n)}),new g(".gallery a",{}).refresh()},w=async t=>{u=t,a=1;const r=await m(t,a);r&&(l.innerHTML="",p(r.hits),y(r.totalHits))},I=async()=>{a++;const t=await m(u,a);t&&(p(t.hits),y(t.totalHits))},y=t=>{a*f<t?i.style.display="block":(i.style.display="none",d.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))};b.addEventListener("submit",async t=>{t.preventDefault();const r=t.target.elements.searchQuery.value.trim();r!==""&&w(r)});i.addEventListener("click",I);
//# sourceMappingURL=commonHelpers.js.map