let cat = document.getElementById('cat-btn');
let cont = document.getElementById('content-container');
let inp=document.getElementById('searchInput')

async function loadBooks() {
  const query = inp.value.trim()  // use user input or default
  const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  console.log(data)
  cont.innerHTML = "";

  data.docs.slice(0, 30).forEach(book => {
    const coverId = book.cover_i;
    const imgSrc = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : `https://via.placeholder.com/150x220?text=No+Cover`;

    const card = document.createElement('div');
    card.className = "card";
    card.style.width = "160px";
    card.style.margin = "10px";
    card.innerHTML = `
      <img src="${imgSrc}" alt="${book.title}" />
      <div class="p-2">
        <h6>${book.title}</h6>
        <small>${book.author_name?.[0] || 'Unknown Author'}</small>
      </div>
    `;
    cont.appendChild(card);
  });
}


