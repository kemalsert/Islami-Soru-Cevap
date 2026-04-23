async function loadPost() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const response = await fetch(`/api/get-post?slug=${slug}`);
    const data = await response.json();

    document.getElementById('soru-baslik').innerText = data.soru;
    
    const hKart = document.getElementById('hukum-kart');
    hKart.innerText = data.hukum;
    hKart.className = `hukum-box bg-${data.hukum.toLowerCase()}`;

    if(data.ayet_metin) {
        document.getElementById('ayet-metin').innerText = data.ayet_metin;
        document.getElementById('ayet-ref').innerText = data.ayet_referans;
    }

    if(data.hadis_metin) {
        document.getElementById('hadis-metin').innerText = data.hadis_metin;
        document.getElementById('hadis-bilgi').innerText = data.hadis_bilgi;
    }

    const mezhepler = JSON.parse(data.mezhepler_json);
    const tbody = document.getElementById('mezhep-body');
    
    Object.keys(mezhepler).forEach(m => {
        const row = `<tr>
            <td class="${m.toLowerCase()}-bg"><strong>${m}</strong></td>
            <td class="${m.toLowerCase()}-bg">${mezhepler[m]}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}
