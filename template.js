function template(id, name, img, types, color){ 
  let typeImg = types.map(type => 
    `<img src="./assets/icons/${type}.svg" alt="${type}">`).join(" ");
  
  return `
  <div class="card">
    <div class="title">
      <h3>#${id}</h3>
        <h4>${name}</h4>
      </div>
      <div class="image ${color}">
        <img src="${img}" alt="" />
      </div>
    <div class="icons">
      ${typeImg}
    </div>
  </div>`};