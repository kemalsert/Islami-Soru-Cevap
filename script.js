const WORKER_URL = 'https://fetvaci.kullaniciadiniz.workers.dev';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('s');

    if (slug) {
        loadPost(slug);
    } else if (document.getElementById('featuredGrid')) {
        loadHome();
    }
});

async function loadHome() {
    const res = await fetch(`${WORKER_URL}/api/home`);
    const data = await res.json();

    const featuredGrid = document.getElementById('featuredGrid');
    const mekruhGrid = document.getElementById('mekruhGrid');

    data.featured.forEach(item => {
        featuredGrid.innerHTML += createCard(item);
    });

    data.mekruhlar.forEach(item => {
        mekruhGrid.innerHTML += createCard(item);
    });
}

function createCard(item) {
    return `
        <div class="card" onclick="location.href='post.html?s=${item.slug}'">
            <h3>${item.soru}</h3>
            <p>${item.kategori}</p>
        </div>
    `;
}

async function loadPost(slug) {
    const res = await fetch(`${WORKER_URL}/api/post?slug=${slug}`);
    const post = await res.json();

    document.getElementById('postTitle').innerText = post.soru;
    document.getElementById('hukumText').innerText = post.hukum;
    
    // Hüküm Rengi Belirleme
    const card = document.getElementById('hukumCard');
    const h = post.hukum.toLowerCase();
    if(h.includes('mekruh')) card.classList.add('hukum-mekruh');
    else if(h.includes('helal') || h.includes('caiz')) card.classList.add('hukum-helal');
    else card.classList.add('hukum-haram');

    if(post.ayet_metin) {
        document.getElementById('ayetBox').classList.remove('hidden');
        document.getElementById('ayetText').innerText = post.ayet_metin;
        document.getElementById('ayetRef').innerText = post.ayet_referans;
    }

    if(post.hadis_metin) {
        document.getElementById('hadisBox').classList.remove('hidden');
        document.getElementById('hadisText').innerText = post.hadis_metin;
        document.getElementById('hadisRef').innerText = post.hadis_bilgi;
    }

    document.getElementById('aciklama').innerText = post.aciklama;

    // Mezhepler Tablosu
    const mezhepler = JSON.parse(post.mezhep_json);
    const mTable = document.getElementById('mezhepTable');
    for (const [name, text] of Object.entries(mezhepler)) {
        mTable.innerHTML += `
            <div class="mezhep-item" style="background: #f9f9f9; border-top: 4px solid var(--primary)">
                <strong>${name}</strong>
                <p>${text}</p>
            </div>
        `;
    }
}

function searchAction() {
    const query = document.getElementById('searchInput').value;
    alert('Arama özelliği aktif: ' + query); // Worker'da search endpoint'ine bağlanacak
}
