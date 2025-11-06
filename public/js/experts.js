document.getElementById('postForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const content = document.getElementById('content').value;
  const res = await fetch('/api/posts', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ title, author, content })
  });
  const p = await res.json();
  alert('Published: ' + p.title);
  location.reload();
});

async function loadPosts() {
  const res = await fetch('/api/posts');
  const posts = await res.json();
  const el = document.getElementById('posts');
  el.innerHTML = '<h3>Existing Posts</h3>';
  posts.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h4>${p.title}</h4><p><em>by ${p.author}</em></p><p>${p.content}</p>`;
    el.appendChild(card);
  });
}
loadPosts();
