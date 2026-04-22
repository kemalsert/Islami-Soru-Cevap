let data = [
  {
    soru: "Sigara içmek haram mı?",
    slug: "sigara-icmek-haram-mi",
    hukum: "mekruh",
    aciklama: "Sigara konusu mezhepler arasında ihtilaflıdır...",
    mezhepler: [
      {mezhep:"Hanefi", gorus:"tahrimen mekruh"},
      {mezhep:"Şafii", gorus:"haram"},
      {mezhep:"Maliki", gorus:"haram"},
      {mezhep:"Hanbeli", gorus:"haram"}
    ],
    hadisler: [
      {
        metin: "Zarara yol açan şey haramdır",
        ravi_zinciri: ["Buhari", "Muslim"],
        sihhat: "sahih"
      }
    ]
  }
];

// RENK BADGE
function badge(h) {
  return `<span class="badge ${h}">${h.toUpperCase()}</span>`;
}

// INDEX
if (document.getElementById("posts")) {
  let html = "";
  data.forEach((p, i) => {
    html += `
      <div class="card" onclick="openPost(${i})">
        <h3>${p.soru}</h3>
        ${badge(p.hukum)}
      </div>
    `;
  });
  document.getElementById("posts").innerHTML = html;
}

// POST PAGE
function openPost(i) {
  localStorage.setItem("post", i);
  window.location = "post.html";
}

if (document.getElementById("content")) {
  let i = localStorage.getItem("post");
  let p = data[i];

  let mezhepTable = "<table><tr><th>Mezhep</th><th>Görüş</th></tr>";
  p.mezhepler.forEach(m => {
    mezhepTable += `<tr><td>${m.mezhep}</td><td>${m.gorus}</td></tr>`;
  });
  mezhepTable += "</table>";

  let hadisHTML = "";
  p.hadisler.forEach(h => {
    hadisHTML += `
      <div class="hadis ${h.sihhat}">
        <b>${h.sihhat.toUpperCase()}</b><br>
        ${h.metin}<br>
        <small>${h.ravi_zinciri.join(" → ")}</small>
      </div>
    `;
  });

  document.getElementById("content").innerHTML = `
    <h1>${p.soru}</h1>
    ${badge(p.hukum)}
    <p>${p.aciklama}</p>
    <h3>Mezhepler</h3>
    ${mezhepTable}
    <h3>Hadisler</h3>
    ${hadisHTML}
  `;
}