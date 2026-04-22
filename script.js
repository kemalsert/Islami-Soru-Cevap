fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('question-list');
    const searchInput = document.getElementById('search');

    function displayQuestions(questions) {
      list.innerHTML = '';
      questions.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
          <h3>${item.soru}</h3>
          <span class="badge">${item.kategori}</span>
        `;
        div.onclick = () => window.location.href = `post.html?slug=${item.slug}`;
        list.appendChild(div);
      });
    }

    displayQuestions(data);

    searchInput.oninput = (e) => {
      const filtered = data.filter(q => q.soru.toLowerCase().includes(e.target.value.toLowerCase()));
      displayQuestions(filtered);
    };
  });
