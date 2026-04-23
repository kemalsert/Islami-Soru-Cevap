const path = window.location.pathname;

// ANA SAYFA
if (path === "/") {
  fetch("/")
    .then(res => res.json())
    .then(data => {

      const onerilen = document.getElementById("onerilenler");
      const mekruh = document.getElementById("mekruh");

      data.fetvalar.forEach(f => {
        onerilen.innerHTML += `
          <div class="card" onclick="go('${f.slug}')">
            <h3>${f.soru}</h3>
            <p>${f.hukum}</p>
          </div>
        `;
      });

      data.mekruh.forEach(f => {
        mekruh.innerHTML += `
          <div class="card mekruh" onclick="go('${f.slug}')">
            <h3>${f.soru}</h3>
          </div>
        `;
      });
    });
}

// POST SAYFA
if (path.startsWith("/post/")) {
  fetch(path)
    .then(res => res.json())
    .then(res => {

      const f = res.data;
      const mezhep = JSON.parse(f.mezhepler_json);

      document.getElementById("post").innerHTML = `
        <h1>${f.soru}</h1>

        <div class="card ${f.hukum}">
          Hüküm: ${f.hukum}
        </div>

        ${f.ayet_metin ? `
          <div class="quote">
            ${f.ayet_metin}<br>
            <small>${f.ayet_referans}</small>
          </div>` : ""}

        ${f.hadis_metin ? `
          <div class="quote">
            ${f.hadis_metin}<br>
            <small>${f.hadis_bilgi}</small>
          </div>` : ""}

        <div class="card">
          <h3>Açıklama</h3>
          <p>${f.aciklama}</p>
        </div>

        <table class="table">
          <tr>
            <td class="hanefi">${mezhep.Hanefi}</td>
            <td class="safii">${mezhep["Şafii"]}</td>
          </tr>
          <tr>
            <td class="maliki">${mezhep.Maliki}</td>
            <td class="hanbeli">${mezhep.Hanbeli}</td>
          </tr>
        </table>
      `;
    });
}

function go(slug){
  window.location.href = "/post/" + slug;
}
