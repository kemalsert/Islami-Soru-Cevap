const path = window.location.pathname;

// Hüküm class map (çok önemli)
function getHukumClass(hukum) {
  hukum = hukum.toLowerCase();

  if (hukum.includes("haram")) return "haram";
  if (hukum.includes("helal")) return "helal";
  if (hukum.includes("mekruh")) return "mekruh";
  if (hukum.includes("mubah")) return "mubah";

  return "";
}

// ANA SAYFA
if (path === "/" || path === "/index.html") {
  fetch("/")
    .then(res => res.json())
    .then(data => {

      const onerilen = document.getElementById("onerilenler");
      const mekruh = document.getElementById("mekruh");

      // ÖNERİLENLER
      data.fetvalar.forEach(f => {
        onerilen.innerHTML += `
          <div class="card ${getHukumClass(f.hukum)}" onclick="go('${f.slug}')">
            <h3>${f.soru}</h3>
            <p>${f.hukum}</p>
          </div>
        `;
      });

      // MEKRUH (tartışmalı)
      data.mekruh.forEach(f => {
        mekruh.innerHTML += `
          <div class="card mekruh" onclick="go('${f.slug}')">
            <h3>${f.soru}</h3>
            <p>⚖️ Mekruh</p>
          </div>
        `;
      });

      // 🔍 ARAMA
      document.getElementById("search").addEventListener("input", e => {
        const val = e.target.value.toLowerCase();

        document.querySelectorAll(".card").forEach(card => {
          card.style.display = card.innerText.toLowerCase().includes(val)
            ? "block"
            : "none";
        });
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
        <div class="container">

          <h1>${f.soru}</h1>

          <div class="card ${getHukumClass(f.hukum)}">
            <h2>Hüküm: ${f.hukum}</h2>
          </div>

          ${f.ayet_metin ? `
            <div class="quote">
              ${f.ayet_metin}
              <br><small>${f.ayet_referans}</small>
            </div>
          ` : ""}

          ${f.hadis_metin ? `
            <div class="quote">
              ${f.hadis_metin}
              <br><small>${f.hadis_bilgi}</small>
            </div>
          ` : ""}

          <div class="card">
            <h3>📖 Açıklama</h3>
            <p>${f.aciklama}</p>
          </div>

          <div class="card">
            <h3>📚 Mezhepler</h3>
            <table class="table">
              <tr>
                <td class="hanefi"><b>Hanefi</b><br>${mezhep.Hanefi}</td>
                <td class="safii"><b>Şafii</b><br>${mezhep["Şafii"]}</td>
              </tr>
              <tr>
                <td class="maliki"><b>Maliki</b><br>${mezhep.Maliki}</td>
                <td class="hanbeli"><b>Hanbeli</b><br>${mezhep.Hanbeli}</td>
              </tr>
            </table>
          </div>

        </div>
      `;
    });
}

// SAYFA GEÇİŞ
function go(slug){
  window.location.href = "/post/" + slug;
}
