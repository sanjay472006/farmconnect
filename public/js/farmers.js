async function loadPosts() {
  const res = await fetch('/api/posts');
  const posts = await res.json();
  const el = document.getElementById('posts');
  el.innerHTML = '<h3>Latest Posts</h3>';
  posts.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h4>${p.title}</h4><p><em>by ${p.author}</em></p><p>${p.content}</p>`;
    el.appendChild(card);
  });
}
loadPosts();
