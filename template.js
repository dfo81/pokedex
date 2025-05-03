template = p =>
    `
     <div class="cards">
       <div class="titles">
         <h6>#${p.id}</h6>
           <h7>${p.name}</h7>
         </div>
         <div class="image ${p.color}">
           <img src="${p.img}" alt="" />
         </div>
       <div class="icons">
       ${p.types.map(type => `<img src="./assets/icons/${type}.svg">`).join('')}
       </div>
     </div>`;