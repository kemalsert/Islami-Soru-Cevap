const API = "/api";

async function search() {
  const q = document.getElementById("searchInput").value;
  if (!q) return;

  window.location.href = `/post.html?slug=${encodeURIComponent(q)}`;
}

async function loadHome() {
  const res1 = await fetch(API + "/recommended");
  const rec = await res1.json();

  const res2 = await fetch(API + "/controversial");
  const con = await res2.json();

  document.getElementById("recommended").innerHTML =
    rec.map(i => `<a href="/post.html?slug=${i.slug}">📌 ${i.soru}</a>`).join("<br>");

  document.getElementById("controversial").innerHTML =
    con.map(i => `<a href="/post.html?slug=${i.slug}">⚠ ${i.soru}</a>`).join("<br>");
}

async function loadPost() {
  const slug = new URLSearchParams(location.search).get("slug");

  const res = await fetch(API + "/post/" + slug);
  const data = await res.json();

  const mezhep = JSON.parse(data.mezhepler_json || "{}");

  document.getElementById("post").innerHTML = `
    <div class="card post">
      <h1>${data.soru}</h1>

      <div class="hukum ${data.hukum}">
        <h3>Hüküm: ${data.hukum}</h3>
      </div>

      ${data.ayet_metin ? `
      <div class="quote">
        ${data.ayet_metin}
        <small>${data.ayet_referans}</small>
      </div>` : ""}

      ${data.hadis_metin ? `
      <div class="quote">
        ${data.hadis_metin}
        <small>${data.hadis_bilgi}</small>
      </div>` : ""}

      <h3>Mezheplerin Görüşü</h3>
      <div class="mezhepler">
        <div class="m">Hanefi: ${mezhep.Hanefi}</div>
        <div class="m">Şafii: ${mezhep.Şafii}</div>
        <div class="m">Maliki: ${mezhep.Maliki}</div>
        <div class="m">Hanbeli: ${mezhep.Hanbeli}</div>
      </div>
    </div>
  `;
}

if (document.getElementById("recommended")) {
  loadHome();
}
