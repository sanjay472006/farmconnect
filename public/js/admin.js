async function loadAll(){
  const res1 = await fetch('/api/posts');
  const posts = await res1.json();
  const el = document.getElementById('posts');
  el.innerHTML = '<h3>All Posts</h3>';
  posts.forEach(p=>{
    const d = document.createElement('div');
    d.className='card';
    d.innerHTML = `<h4>${p.title}</h4><p><em>by ${p.author}</em></p><p>${p.content}</p>`;
    el.appendChild(d);
  });

  const res2 = await fetch('/api/faqs');
  const faqs = await res2.json();
  const f = document.getElementById('faqs');
  f.innerHTML = '<h3>FAQs</h3>';
  faqs.forEach(q=>{
    const d = document.createElement('div');
    d.className='card';
    d.innerHTML = `<p><strong>Q:</strong> ${q.q}</p><p><strong>A:</strong> ${q.a}</p>`;
    f.appendChild(d);
  });
}
loadAll();
