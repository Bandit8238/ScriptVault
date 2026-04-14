const API = '/api/scripts';

async function fetchScripts() {
  const res = await fetch(API);
  const data = await res.json();

  const container = document.getElementById('scripts');
  container.innerHTML = '';

  data.forEach(script => {
    const div = document.createElement('div');
    div.className = 'script';

    div.innerHTML = `
      <h3>${script.name}</h3>
      <p>Category: ${script.category}</p>
      <p>Rating: ${script.rating.toFixed(1)}</p>
      <button onclick="injectScript(\`${script.code}\`)">Inject</button>
      <button onclick="rateScript('${script.id}', 5)">⭐ Rate 5</button>
    `;

    container.appendChild(div);
  });
}

async function uploadScript() {
  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const code = document.getElementById('code').value;

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, category, code })
  });

  fetchScripts();
}

function injectScript(code) {
  const script = document.createElement('script');
  script.textContent = code;
  document.body.appendChild(script);
}

async function rateScript(id, rating) {
  await fetch(`${API}/${id}/rate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rating })
  });

  fetchScripts();
}

fetchScripts();
