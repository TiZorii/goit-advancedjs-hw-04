import{S as h,i as f,a as g}from"./assets/vendor-c7243a5b.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const b=document.getElementById("search-form"),l=document.querySelector(".gallery"),i=document.querySelector(".load-more"),L="40880648-0c49830a119af18016c24c7ec",w="https://pixabay.com/api/",d=40;let n=1,u="";const v=new h(".gallery a",{});i.style.display="none";const m=async(e,o)=>{try{return(await g.get(w,{params:{key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:d}})).data}catch(r){return console.error("Error fetching images:",r),null}},y=e=>{const o=e.map(r=>{const a=`
      <p class="info-item"><b>Likes:</b> ${r.likes}</p>
      <p class="info-item"><b>Views:</b> ${r.views}</p>
      <p class="info-item"><b>Comments:</b> ${r.comments}</p>
      <p class="info-item"><b>Downloads:</b> ${r.downloads}</p>
    `;return`
      <a href="${r.largeImageURL}" class="photo-card">
        <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy">
        <div class="info">${a}</div>
      </a>
    `}).join("");e.length===0&&n===1?(l.innerHTML="",f.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again."})):(l.insertAdjacentHTML("beforeend",o),v.refresh())},I=async e=>{u=e,n=1;const o=await m(e,n);o&&(y(o.hits),p(o.totalHits))},E=async()=>{n++;const e=await m(u,n);e&&(y(e.hits),p(e.totalHits))},p=e=>{n*d<e?i.style.display="block":(i.style.display="none",n===1&&e>0&&f.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))};b.addEventListener("submit",async e=>{e.preventDefault();const o=e.target.elements.searchQuery.value.trim();o!==""&&I(o)});i.addEventListener("click",E);
//# sourceMappingURL=commonHelpers.js.map
